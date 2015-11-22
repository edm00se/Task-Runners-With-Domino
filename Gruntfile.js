// our wrapper function (required by grunt and its plugins)
module.exports = function(grunt) {

  // CONFIGURE GRUNT
  grunt.initConfig({

    // get the configuration info from package.json
    pkg: grunt.file.readJSON('package.json'),

    // configure plugin with information, sample here is jshint, which doesn't like my code
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        '-W033': true, // mising semicolon
        '-W041': true, // use 'x' to compare with 'y'
        '-W004': true, // x already in use
        '-W014': true // bad line breaking before '||'
      },
      all: ['Grunfile.js', 'NSF/WebContent/js/*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'public/dist/scripts_via_grunt.min.js': 'NSF/WebContent/js/*.js'
        }
      }
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/styles_from_grunt.min.css': 'NSF/WebContent/css/*.css'
        }
      }
    },

    // configure htmlmin to remove comments and whitespace or more for dev vs dist
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: 'NSF/WebContent/partials',
          src: '{,*/}*.html',
          dest: 'NSF/WebContent/dist/views'
        }]
       }
    },

    // configure watch to auto update ------------------------------------------
    watch: {
      stylesheets: {
        files: ['NSF/WebContent/css/*.css'],
        tasks: ['cssmin']
      },
      scripts: {
        files: 'NSF/WebContent/js/*.js',
        tasks: ['jshint', 'uglify']
      },
      partials: {
        files: 'NSF/WebContent/partials/*.html',
        tasks: ['htmlmin']
      }
    },

    run: {
      options: {
        // Task-specific options go here.
      },
      serve: {
        exec: 'json-server --id unid db.json --watch --routes routes.json'
      }
    },

    browserSync: {
      dev: {
          bsFiles: {
              src : [
                      'NSF/WebContent/css/*.css',
                      'NSF/WebContent/js/*.js',
                      'NSF/WebContent/partials/*.html'
                    ]
          },
          options: {
              watchTask: true,
              proxy: 'http://localhost:3000/'
          }
      }
    }

  });

  // LOAD GRUNT PLUGINS
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-run');

  // CREATE TASKS
  grunt.registerTask('default', ['jshint','uglify','cssmin','htmlmin','run:serve','browserSync']);

};