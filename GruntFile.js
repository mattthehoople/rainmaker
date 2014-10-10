module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    secret: grunt.file.readJSON('secret.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/js/utils.js', 'app/js/models/*.js', 'app/js/views/base/*.js', 'app/js/views/*.js', 'app/js/main.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    clean: ["dist/css", "dist/js", "dist/lib", "dist/tpl"],
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'app/js/**/*.js', 'test/spec/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/', src: ['css/*'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'app/', src: ['lib/*'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'app/', src: ['tpl/*'], dest: 'dist/', filter: 'isFile'}
        ]
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    jasmine: {
      src: ['app/lib/jquery.js', 'app/lib/underscore-min.js', 'app/lib/backbone-min.js', 'app/lib/d3.min.js', 'app/lib/backbone.d3.min.js', 'app/lib/othercookie.js', 'app/js/**/*.js', 'app/js/main.js'],
      options: {
        specs: 'test/spec/*.js'
      }
    },
    sftp: {
      test: {
        files: {
          "./": "dist/**"
        },
        options: {
          path: '<%= secret.path %>',
          srcBasePath: "dist/",
          host: '<%= secret.host %>',
          username: '<%= secret.username %>',
          password: '<%= secret.password %>',
          showProgress: true,
          createDirectories: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-ssh');

  grunt.registerTask('test', ['jshint', 'jasmine']);

  grunt.registerTask('package', ['clean', 'concat', 'uglify', 'copy']);

  grunt.registerTask('deploy', ['sftp']);

};
