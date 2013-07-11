module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['Gruntfile.js', 'src/**/*.js', 'lib/**/*.js', 'test/**/*.js']
		},
		uglify: {
			options: {
				mangle: true,
				banner: '/*! <%= pkg.name %> <%= pkg.version %> - ' + 
					'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			build: {
				files: {
					'dist/image-hotspots.min.js' : ['src/image-hotspots.js']
				}
			}
		},
		watch: {
			files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			tasks: ['jshint','uglify']
		},
		qunit: {
			all: {
				options: {
					urls: [
						'http://localhost:8888/test/image-hotspots-test.html'
					]
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 8888,
					base: '.'
				}
			}
		}
	});

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'uglify']);

	// Test tasks(s).
	grunt.registerTask('test', ['connect', 'qunit']);
};