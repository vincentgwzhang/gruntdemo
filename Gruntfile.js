module.exports = function(grunt) {

  var sassStyle = 'expanded';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //compile SCSS
    sass: {
      output : {
        options: {
          style: sassStyle
        },
        files: {
          './style.css': './scss/style.scss',
          './body.css': './scss/body.scss'
        }
      }
    },

    //concat together
    concat: {
      dist: {
        src: ['./src/plugin.js', './src/plugin2.js'],
        dest: './global.js',
      },
    },

    //compress it
    uglify: {
      compressjs: {
        files: {
          './global.min.js': ['./global.js']
        }
      }
    },

    // check js hint
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      all: ['./global.js']
    },


    watch: {

      // watch following js files, one it changed, trigger watch
      scripts: {
        files: ['./src/plugin.js','./src/plugin2.js'],
        tasks: ['concat','jshint','uglify']
      },

      // watch following sass files, one it changed, trigger watch
      sass: {
        files: ['./scss/style.scss', './scss/body.scss'],
        tasks: ['sass']
      },

      // reload the page once following files updated
      livereload: {
          options: {
              livereload: '<%= connect.options.livereload %>'
          },
          files: [
              'index.html',
              'style.css',
              'js/global.min.js'
          ]
      }
    },

    // connect to server, allow html page will reload once watch task trigger
    connect: {
      options: {
          port: 9000,
          open: true,
          livereload: 35729,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
      },
      server: {
        options: {
          port: 9001,
          base: './'
        }
      }
    }
  });

  // loading grunt plunin
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  //register task
  grunt.registerTask('outputcss',['sass']);
  grunt.registerTask('concatjs',['concat']);
  grunt.registerTask('compressjs',['concat','jshint','uglify']);
  grunt.registerTask('watchit',['sass','concat','jshint','uglify','connect','watch']);
  grunt.registerTask('default',['sass','concat','uglify']);

};
