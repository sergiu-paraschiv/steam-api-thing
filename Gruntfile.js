module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        jshint: {
            all: ['app/scripts/**/*.js', 'app/config/**/*.js']
        },
        
        jasmine: {
            all: ['tests/unit/**/*.js']
        },
        
        watch: {
            test: {
                files: ['app/scripts/**/*.js', 'tests/steps/**/*.js'],
                tasks: ['jshint', 'jasmine']
            },

            server: {
                options: {
                    livereload: true
                },
                files: ['app/**/*.js', 'app/styles/**/*.css', 'app/index.html']
            }
        },
        
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'app',
                }
            }
        },
        
        open: {
            server: {
                path: 'http://localhost:9001/',
                app: 'Chrome'
            }
        },
        
        clean: {
            beforeBuild: {
                src: ['build']
            },

            afterBuild: {
                src: ['.tmp', 'build/scripts/templates.js', 'app/config']
            }
        },
        
        ngtemplates: {
            SteamAPIThing: {
                cwd: '',
                src: 'app/views/**/*.html',
                dest: '.tmp/concat/scripts/templates.js'
            }
        },
        
        concat: {
            addTemplates: {
                src: ['.tmp/concat/scripts/scripts.js', '.tmp/concat/scripts/templates.js'],
                dest: '.tmp/concat/scripts/scripts.js'
            }
        },
        
        useminPrepare: {
            html: 'app/index.html',
            options: {
                root: 'app',
                dest: 'build'
            }
        },
  
        usemin: {
            html: 'build/index.html',
            options: {
                dest: 'build'
            }
        },

        copy: {
            beforeBuild: {
                files: [
                    { expand: true, flatten: true, src: ['app/index.html'], dest: 'build'}
                ]
            },

            afterBuild: {
                files: [
                    { expand: true, flatten: true, src: ['app/images/*'], dest: 'build/images/' },
                    { expand: true, flatten: true, src: ['.tmp/concat/scripts/*'], dest: 'build/scripts/' }
                ]
            },
            
            beforeReplace: {
                files: [
                    { expand: true, flatten: true, src: ['config/*'], dest: 'app/config/' }
                ]
            }
        },
        
        replace: {
            all: {
                options: {
                    patterns: grunt.file.readJSON('.constants')
                },
                files: [
                    {expand: true, flatten: true, src: ['app/config/*'], dest: 'app/config/'}
                ]
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace');
    
    grunt.registerTask('test', [
        'jshint',
        'jasmine'
    ]);

    grunt.registerTask('dev-server', [
        'copy:beforeReplace',
        'replace',
        'connect:server',
        'open:server',
        'watch:server'
    ]);
    
    grunt.registerTask('dev-test', [
        'watch:test'
    ]);
    
    grunt.registerTask('build', [
        'clean:beforeBuild',
        'copy:beforeBuild',
        'copy:beforeReplace',
        'replace',
        'useminPrepare',
        'usemin',
        'concat:generated',
        'cssmin',
        'ngtemplates',
        'concat:addTemplates',
        'copy:afterBuild',
        'clean:afterBuild'
    ]);
};