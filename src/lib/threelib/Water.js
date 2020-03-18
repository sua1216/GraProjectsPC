
import * as THREE from 'three-full'
let publicPath = process.env.BASE_URL;

export default class Water extends THREE.Mesh{

	constructor(geometry, options){
		super(geometry);
		this.type = 'Water';
		this.WaterShader = {
			uniforms: {

				'color': {
					type: 'c',
					value: null
				},

				'reflectivity': {
					type: 'f',
					value: 0
				},

				'tReflectionMap': {
					type: 't',
					value: null
				},

				'tRefractionMap': {
					type: 't',
					value: null
				},

				'tNormalMap0': {
					type: 't',
					value: null
				},

				'tNormalMap1': {
					type: 't',
					value: null
				},

				'textureMatrix': {
					type: 'm4',
					value: null
				},

				'config': {
					type: 'v4',
					value: new THREE.Vector4()
				}

			},
			vertexShader: [

				'#include <fog_pars_vertex>',

				'uniform mat4 textureMatrix;',

				'varying vec4 vCoord;',
				'varying vec2 vUv;',
				'varying vec3 vToEye;',

				'void main() {',

				'	vUv = uv;',
				'	vCoord = textureMatrix * vec4( position, 1.0 );',

				'	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );',
				'	vToEye = cameraPosition - worldPosition.xyz;',

				'	vec4 mvPosition =  viewMatrix * worldPosition;',
				'	gl_Position = projectionMatrix * mvPosition;',

				'	#include <fog_vertex>',

				'}'

			].join( '\n' ),
			fragmentShader: [

				'#include <common>',
				'#include <fog_pars_fragment>',

				'uniform sampler2D tReflectionMap;',
				'uniform sampler2D tRefractionMap;',
				'uniform sampler2D tNormalMap0;',
				'uniform sampler2D tNormalMap1;',

				'#ifdef USE_FLOWMAP',
				'	uniform sampler2D tFlowMap;',
				'#else',
				'	uniform vec2 flowDirection;',
				'#endif',

				'uniform vec3 color;',
				'uniform float reflectivity;',
				'uniform vec4 config;',

				'varying vec4 vCoord;',
				'varying vec2 vUv;',
				'varying vec3 vToEye;',

				'void main() {',

				'	float flowMapOffset0 = config.x;',
				'	float flowMapOffset1 = config.y;',
				'	float halfCycle = config.z;',
				'	float scale = config.w;',

				'	vec3 toEye = normalize( vToEye );',

				'	vec2 flow;',
				'	#ifdef USE_FLOWMAP',
				'		flow = texture2D( tFlowMap, vUv ).rg * 2.0 - 1.0;',
				'	#else',
				'		flow = flowDirection;',
				'	#endif',
				'	flow.x *= - 1.0;',

				'	vec4 normalColor0 = texture2D( tNormalMap0, ( vUv * scale ) + flow * flowMapOffset0 );',
				'	vec4 normalColor1 = texture2D( tNormalMap1, ( vUv * scale ) + flow * flowMapOffset1 );',

				'	float flowLerp = abs( halfCycle - flowMapOffset0 ) / halfCycle;',
				'	vec4 normalColor = mix( normalColor0, normalColor1, flowLerp );',

				'	vec3 normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );',

				'	float theta = max( dot( toEye, normal ), 0.2 );',
				'	float reflectance = reflectivity + ( 1.0 - reflectivity ) * pow( ( 1.0 - theta ), 5.0 );',

				'	vec3 coord = vCoord.xyz / vCoord.w;',
				'	vec2 uv = coord.xy + coord.z * normal.xz * 0.05;',

				'	vec4 reflectColor = texture2D( tReflectionMap, vec2( 1.0 - uv.x, uv.y ) );',
				'	vec4 refractColor = texture2D( tRefractionMap, uv );',

				'	gl_FragColor = vec4( color, 1.0 ) * mix( refractColor, reflectColor, reflectance );',

				'	#include <tonemapping_fragment>',
				'	#include <encodings_fragment>',
				'	#include <fog_fragment>',

				'}'

			].join( '\n' )
		}

		let scope = this;

		options = options || {};

		let color = ( options.color !== undefined ) ? new THREE.Color( options.color ) : new THREE.Color( 0xFFFFFF );
		let textureWidth = options.textureWidth || 512;
		let textureHeight = options.textureHeight || 512;
		let clipBias = options.clipBias || 0;
		let flowDirection = options.flowDirection || new THREE.Vector2( 1, 0 );
		let flowSpeed = options.flowSpeed || 0.03;
		let reflectivity = options.reflectivity || 0.02;
		let scale = options.scale || 1;
		let shader = options.shader || this.WaterShader;

		let textureLoader = new THREE.TextureLoader();

		let flowMap = options.flowMap || undefined;
		// eslint-disable-next-line no-undef
		let normalMap0 = options.normalMap0 || textureLoader.load( `${publicPath}obj/jingmo3/Water_1_M_Normal.jpg` );
		// eslint-disable-next-line no-undef
		let normalMap1 = options.normalMap1 || textureLoader.load( `${publicPath}obj/jingmo3/Water_2_M_Normal.jpg` );

		let cycle = 0.15;
		let halfCycle = cycle * 0.5;
		let textureMatrix = new THREE.Matrix4();
		let clock = new THREE.Clock();

		if ( THREE.Reflector === undefined ) {

			console.error( 'THREE.Water: Required component THREE.Reflector not found.' );
			return;

		}

		if ( THREE.Refractor === undefined ) {

			console.error( 'THREE.Water: Required component THREE.Refractor not found.' );
			return;

		}

		let reflector = new THREE.Reflector( geometry, {
			textureWidth: textureWidth,
			textureHeight: textureHeight,
			clipBias: clipBias
		} );

		let refractor = new THREE.Refractor( geometry, {
			textureWidth: textureWidth,
			textureHeight: textureHeight,
			clipBias: clipBias
		} );

		reflector.matrixAutoUpdate = false;
		refractor.matrixAutoUpdate = false;

		this.material = new THREE.ShaderMaterial( {
			uniforms: THREE.UniformsUtils.merge( [
				THREE.UniformsLib[ 'fog' ],
				shader.uniforms
			] ),
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			transparent: true,
			fog: true
		} );

		if ( flowMap !== undefined ) {

			this.material.defines.USE_FLOWMAP = '';
			this.material.uniforms[ "tFlowMap" ] = {
				type: 't',
				value: flowMap
			};

		} else {

			this.material.uniforms[ "flowDirection" ] = {
				type: 'v2',
				value: flowDirection
			};

		}

		// maps

		normalMap0.wrapS = normalMap0.wrapT = THREE.RepeatWrapping;
		normalMap1.wrapS = normalMap1.wrapT = THREE.RepeatWrapping;

		this.material.uniforms[ "tReflectionMap" ].value = reflector.getRenderTarget().texture;
		this.material.uniforms[ "tRefractionMap" ].value = refractor.getRenderTarget().texture;
		this.material.uniforms[ "tNormalMap0" ].value = normalMap0;
		this.material.uniforms[ "tNormalMap1" ].value = normalMap1;

		this.material.uniforms[ "color" ].value = color;
		this.material.uniforms[ "reflectivity" ].value = reflectivity;
		this.material.uniforms[ "textureMatrix" ].value = textureMatrix;

		this.material.uniforms[ "config" ].value.x = 0; //
		this.material.uniforms[ "config" ].value.y = halfCycle; //
		this.material.uniforms[ "config" ].value.z = halfCycle; //
		this.material.uniforms[ "config" ].value.w = scale; //

		function updateTextureMatrix( camera ) {

			textureMatrix.set(
				0.5, 0.0, 0.0, 0.5,
				0.0, 0.5, 0.0, 0.5,
				0.0, 0.0, 0.5, 0.5,
				0.0, 0.0, 0.0, 1.0
			);

			textureMatrix.multiply( camera.projectionMatrix );
			textureMatrix.multiply( camera.matrixWorldInverse );
			textureMatrix.multiply( scope.matrixWorld );

		}

		function updateFlow() {

			let delta = clock.getDelta();
			let config = scope.material.uniforms[ "config" ];

			config.value.x += flowSpeed * delta;
			config.value.y = config.value.x + halfCycle;

			if ( config.value.x >= cycle ) {

				config.value.x = 0;
				config.value.y = halfCycle;

			} else if ( config.value.y >= cycle ) {

				config.value.y = config.value.y - cycle;

			}

		}

		this.onBeforeRender = function ( renderer, scene, camera ) {

			updateTextureMatrix( camera );
			updateFlow();

			scope.visible = false;

			reflector.matrixWorld.copy( scope.matrixWorld );
			refractor.matrixWorld.copy( scope.matrixWorld );

			reflector.onBeforeRender( renderer, scene, camera );
			refractor.onBeforeRender( renderer, scene, camera );

			scope.visible = true;

		};

	}
}
