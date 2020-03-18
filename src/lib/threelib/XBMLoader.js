
import * as THREE from 'three-full'
import gunzip from '../../../node_modules/zlibjs/bin/gunzip.min.js'

const XBMLoader = ( function () {

	function XBMLoader( manager ) {
		this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;
		this.split_children = true;
		this.group_size = 2;
	}

	XBMLoader.prototype = {

		constructor: XBMLoader,

		load: function ( url, onLoad, onProgress, onError ) {

			let self = this;

			let path = ( self.path === undefined ) ? THREE.LoaderUtils.extractUrlBase( url ) : self.path;

			let loader = new THREE.FileLoader( this.manager );
			loader.setResponseType( 'arraybuffer' );

			loader.load( url, function ( buffer ) {

				try {

					onLoad( self.parse( buffer, path ) );

				} catch ( error ) {

					setTimeout( function () {

						if ( onError ) onError( error );

						self.manager.itemError( url );

					}, 0 );

				}

			}, onProgress, onError );

		},

		setPath: function ( value ) {

			this.path = value;
			return this;

		},

		setSplitChildren: function (value) {
			this.split_children = value;
			return this;
		},

		setGroupSize: function (value) {
			this.group_size = value;
			return this;
		},

		parse: function ( buffer ){
			return new BinaryParser().parse( buffer, this.split_children, this.group_size );
		}
	};

	function BinaryParser() {}

	BinaryParser.prototype = {

		constructor: BinaryParser,

		parse: function ( buffer, split_children, group_size) {
			let inflate = new gunzip.Zlib.Gunzip(new Uint8Array(buffer));
			let data = inflate.decompress();
			let reader = new BinaryReader(data.buffer);
			if (data[0] === 0){
				reader.littleEndian = false;
			}
			else{
				reader.littleEndian = true;
			}
			let header = reader.getInt32Array(4);
			let magic = header[0];
			if (magic !== 0x006d6278){
				console.error("error xbm file");
				return;
			}
			let count = header[2];
			let group_len = header[3];
			let g_array = reader.getInt32Array(3*group_len);
			let p_array = reader.getFloat32Array(count*3);
			let n_array = reader.getFloat32Array(count*3);
			let a_array = reader.getFloat32Array(count*3);
			let uv_array = reader.getFloat32Array(count*2);

			if (split_children && group_len > group_size){
				let geos = [];
				let geo_count = group_len/group_size;
				for (let i = 0; i < geo_count; i ++) {
					let geometry = new THREE.BufferGeometry();
					geometry.groups = [];
					let calc_count = 0;
					for (let j = 0 ; j < group_size; j ++){
						let group = {};
						group.start = calc_count;
						group.count = g_array[i*3*group_size + j*3 + 1];
						group.materialIndex = j;
						geometry.groups.push(group);

						calc_count += group.count;
					}
					geometry.addAttribute('position', new THREE.Float32BufferAttribute(p_array.splice(0, calc_count*3), 3));
					geometry.addAttribute('color', new THREE.Float32BufferAttribute(a_array.splice(0, calc_count*3), 3));
					geometry.addAttribute('normal', new THREE.Float32BufferAttribute(n_array.splice(0, calc_count*3), 3));
					geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uv_array.splice(0, calc_count*2), 2));

					geos.push(geometry);
				}
				return geos;
			}
			else {
				let geometry = new THREE.BufferGeometry();
				geometry.groups = [];
				for (let i = 0; i < group_len; i ++){
					let group = {};
					group.start = g_array[i*3];
					group.count = g_array[i*3 + 1];
					group.materialIndex = g_array[i*3 + 2];
					geometry.groups.push(group);
				}
				geometry.addAttribute('position', new THREE.Float32BufferAttribute(p_array, 3));
				geometry.addAttribute('color', new THREE.Float32BufferAttribute(a_array, 3));
				geometry.addAttribute('normal', new THREE.Float32BufferAttribute(n_array, 3));
				geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uv_array, 2));

				return [geometry];
			}
		}
	};

	function BinaryReader( buffer, littleEndian ) {

		this.dv = new DataView( buffer );
		this.offset = 0;
		this.littleEndian = ( littleEndian !== undefined ) ? littleEndian : true;

	}

	BinaryReader.prototype = {

		constructor: BinaryReader,

		getOffset: function () {

			return this.offset;

		},

		size: function () {

			return this.dv.buffer.byteLength;

		},

		skip: function ( length ) {

			this.offset += length;

		},

		// seems like true/false representation depends on exporter.
		// true: 1 or 'Y'(=0x59), false: 0 or 'T'(=0x54)
		// then sees LSB.
		getBoolean: function () {

			return ( this.getUint8() & 1 ) === 1;

		},

		getBooleanArray: function ( size ) {

			let a = [];

			for ( let i = 0; i < size; i ++ ) {

				a.push( this.getBoolean() );

			}

			return a;

		},

		getUint8: function () {

			let value = this.dv.getUint8( this.offset );
			this.offset += 1;
			return value;

		},

		getInt16: function () {

			let value = this.dv.getInt16( this.offset, this.littleEndian );
			this.offset += 2;
			return value;

		},

		getInt32: function () {

			let value = this.dv.getInt32( this.offset, this.littleEndian );
			this.offset += 4;
			return value;

		},

		getInt32Array: function ( size ) {

			let a = [];

			for ( let i = 0; i < size; i ++ ) {

				a.push( this.getInt32() );

			}

			return a;

		},

		getUint32: function () {

			let value = this.dv.getUint32( this.offset, this.littleEndian );
			this.offset += 4;
			return value;

		},

		// JavaScript doesn't support 64-bit integer so calculate this here
		// 1 << 32 will return 1 so using multiply operation instead here.
		// There's a possibility that this method returns wrong value if the value
		// is out of the range between Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER.
		// TODO: safely handle 64-bit integer
		getInt64: function () {

			let low, high;

			if ( this.littleEndian ) {

				low = this.getUint32();
				high = this.getUint32();

			} else {

				high = this.getUint32();
				low = this.getUint32();

			}

			// calculate negative value
			if ( high & 0x80000000 ) {

				high = ~ high & 0xFFFFFFFF;
				low = ~ low & 0xFFFFFFFF;

				if ( low === 0xFFFFFFFF ) high = ( high + 1 ) & 0xFFFFFFFF;

				low = ( low + 1 ) & 0xFFFFFFFF;

				return - ( high * 0x100000000 + low );

			}

			return high * 0x100000000 + low;

		},

		getInt64Array: function ( size ) {

			let a = [];

			for ( let i = 0; i < size; i ++ ) {

				a.push( this.getInt64() );

			}

			return a;

		},

		// Note: see getInt64() comment
		getUint64: function () {

			let low, high;

			if ( this.littleEndian ) {

				low = this.getUint32();
				high = this.getUint32();

			} else {

				high = this.getUint32();
				low = this.getUint32();

			}

			return high * 0x100000000 + low;

		},

		getFloat32: function () {

			let value = this.dv.getFloat32( this.offset, this.littleEndian );
			this.offset += 4;
			return value;

		},

		getFloat32Array: function ( size ) {

			let a = [];

			for ( let i = 0; i < size; i ++ ) {

				a.push( this.getFloat32() );

			}

			return a;

		},

		getFloat64: function () {

			let value = this.dv.getFloat64( this.offset, this.littleEndian );
			this.offset += 8;
			return value;

		},

		getFloat64Array: function ( size ) {

			let a = [];

			for ( let i = 0; i < size; i ++ ) {

				a.push( this.getFloat64() );

			}

			return a;

		},

		getArrayBuffer: function ( size ) {

			let value = this.dv.buffer.slice( this.offset, this.offset + size );
			this.offset += size;
			return value;

		},

		getString: function ( size ) {

			// note: safari 9 doesn't support Uint8Array.indexOf; create intermediate array instead
			let a = [];

			for ( let i = 0; i < size; i ++ ) {

				a[ i ] = this.getUint8();

			}

			let nullByte = a.indexOf( 0 );
			if ( nullByte >= 0 ) a = a.slice( 0, nullByte );

			return THREE.LoaderUtils.decodeText( new Uint8Array( a ) );

		}

	};

	return XBMLoader;

} )();

export default XBMLoader;