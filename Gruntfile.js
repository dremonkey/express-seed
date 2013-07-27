'use strict';

var path = require('path');

/** 
 * Directory and File Path Configuration
 */

var paths = {

  client: {
    tld: path.resolve(__dirname, '../client')
  },

  // Compiled Assets Directory
  compiled: {
    tld: path.resolve(__dirname, '../.tmp')
  },

  // Server Directory and Paths
  srv: {
    tld: __dirname, // directory path to top level
    dirs: {},
    files: {
      views: [
        '<%= paths.srv.tld %>/views/**/*.{jade,ect,dust,html}',
        '<%= paths.srv.tld %>/views/{,*/}*.{jade,ect,dust,html}'
      ],
      scripts: [
        '<%= paths.srv.tld %>/**/*.js',
        '!<%= paths.srv.tld %>/node_modules/**/*.js'
      ]
    }
  }
};

module.exports = function (grunt) {

  /**
   * Register all Grunt Tasks
   */

  // Run 'grunt dev' for live-reloading development environment
  grunt.registerTask('dev', ['env:dev', 'build:dev', 'server:dev', 'concurrent:dev']);

  // Run 'grunt dist' to build and run the distribution environment
  grunt.registerTask('dist', ['env:dist', 'build:dist', 'server:dist']);

  // Clean, validate & compile web-accessible resources
  grunt.registerTask('build:dev', ['jshint']);
  grunt.registerTask('build:dist', ['jshint']);

  // Start the express server and open the site in a browser
  grunt.registerTask('server:dev', ['express:dev', 'open:dev']);
  grunt.registerTask('server:dist', ['express:dist', 'open:dist', 'express-keepalive']);


  /**
   * Grunt Configurations
   */

  grunt.initConfig({

    paths: paths,

    env: {
      dev: {
        NODE_ENV: 'local'
      },
      dist: {
        NODE_ENV: 'stage'
      }
    },

    // Restarts the nodejs server when files change
    nodemon: {
      options: {
        file: 'server.js',
        watchedExtensions: ['js'],
        ignoredFiles: ['Gruntfile.js', 'node_modules/**/*.js']
      },
      dev: {
        options: {
          env: {
            NODE_ENV: 'local'
          }
        }
      },
      dist: {
        options: {
          env: {
            NODE_ENV: 'stage'
          }
        }
      }
    },

    concurrent: {
      dev: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['nodemon']
      }
    },

    // Express requires 'server.js' to reload from changes
    express: {
      options: {
        hostname: 'localhost',
        port: 9000
      },
      dev: {
        options: {
          port: 9000,
          server: '<%= paths.srv.tld %>/server.js'
        }
      },
      dist: {
        options: {
          port: 9000,
          server: '<%= paths.srv.tld %>/server.js'
        }
      }
    },

    // Automatically open browser
    open: {
      dev: {
        url: 'http://localhost:<%= express.dev.options.port %>'
      },
      dist: {
        url: 'http://localhost:<%= express.dist.options.port %>'
      }
    },

    // Check javascript for errors
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '<%= paths.srv.files.scripts %>'
      ]
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  /**
   * Load all dev grunt task dependencies
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
