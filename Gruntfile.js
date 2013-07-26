module.exports = function(grunt) {

	var semver = require('semver');

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.loadNpmTasks('grunt-bump');

	// Project Configuration
	grunt.initConfig({
		semver: semver,
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['Gruntfile.js', 'src/**/*.js', 'lib/**/*.js', 'test/**/*.js']
		},
		uglify: {
			options: {
				mangle: true,
				banner: '/*! <%= pkg.name %> <%= semver.inc(pkg.version, "patch") %> - ' + 
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
		},
		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				updateConfigs: [],
				commit: true,
				commitMessage: 'Release %VERSION%',
				commitFiles: ['package.json', 'bower.json'], // '-a' for all files
				createTag: true,
				tagName: '%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: false,
				pushTo: 'upstream',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
			}
		}		
	});

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'uglify']);

	// Test tasks(s).
	grunt.registerTask('test', ['connect', 'qunit']);
};