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
          {expand: true, cwd: 'app/', src: ['tpl/*'], dest: 'dist/', filter: 'isFile'},
          //{expand: true, src: ['app/*'], dest: 'dist/', filter: 'isFile'}
        ]
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    jasmine: {
      src: ['app/lib/*.js', 'app/js/**/*.js', 'app/js/*.js'],
      options: {
        specs: 'test/spec/*.js'
      }
    },
    s3deploy: {
      options: {
        key: '<%= secret.awsKey %>',
        secret: '<%= secret.awsSecret %>',
        bucket: '<%= secret.awsBucket %>',
        access: 'public-read',
        connections: 5
      },
        dist: {
          files: [{
            expand: true,
            cwd: 'dist/',
            src: '**/*.*',
            dest: './'
          }]
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-awssum-deploy');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jshint', 'jasmine']);

  grunt.registerTask('package', ['clean', 'concat', 'uglify', 'copy']);

  grunt.registerTask('deploy', ['s3Deploy']);

};
