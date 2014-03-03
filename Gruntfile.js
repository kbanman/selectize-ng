module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('bower.json'),
    jshint: {
      options: {
        jshintrc: true
      },
      files: [
        'selectize-ng.js'
      ]
    },
    watch: {
      scripts: {
        files: [
          'selectize-ng.js',
          'Gruntfile.js',
          'test/*.js'
        ],
        tasks: ['build']
      }
    },
    ngmin: {
      dist: {
        src: ['selectize-ng.js'],
        dest: 'dist/selectize-ng.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= bower.name %> - v<%= bower.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> | ' +
          '<%= pkg.repository.url %> | ' +
          '<%= pkg.license %> License */\n'
      },
      default: {
        files: {
          'dist/selectize-ng.min.js': ['dist/selectize-ng.js']
        }
      }
    },
    concat: {
      standalone: {
        src: [
          'lib/selectize/dist/js/standalone/selectize.min.js',
          'dist/selectize-ng.min.js'
        ],
        dest: 'dist/standalone/selectize-ng.min.js'
      }
    },
    karma: {
      test: {
        configFile: 'test/karma.conf.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['karma']);
  grunt.registerTask('build', ['jshint', 'ngmin', 'uglify', 'concat', 'karma']);
  grunt.registerTask('default', 'test');
};