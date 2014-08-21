module.exports = function(grunt) {


	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		jshint: {
  			// define the files to lint
  			files: [
  				'index.js',
  				'Gruntfile.js', 
  				'modules/**/*.js',
  				'controllers/**/*.js',
  				'static/firejose/**/*.js'],
  			// configure JSHint (documented at http://www.jshint.com/docs/)
  			options: {
	 			// more options here if you want to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', ['jshint']);
	
};