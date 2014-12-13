var version = require('./build/version'),
    setup = require('./build/setup'),
    config = require('./build/config'),
    path = require('path'),
    connect_livereload = require('connect-livereload');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');

    var meta = {
        name: 'mirana'
    };
    var ports = {
        testsite: 6001,
        stress: 6002,
        livereload: 30643
    };
    var dirs = {
        test: {
            root: 'test',
            build: 'test/.build',
            lib: 'test/lib'
        },
        stress: {
            root: 'stress',
            build: 'stress/.build',
            lib: 'stress/lib'
        }
    };

    function mount(connect, dir) {
        return connect.static(path.resolve(dir));
    }

    grunt.initConfig({
        ports: ports,
        meta: meta,
        dirs: dirs,
        pkg: grunt.file.readJSON('./package.json'),
        clean: {
            bower: ['./lib'],
            test: [dirs.test.lib],
            stress: [dirs.stress.lib]
        },
        setup: {
            base: {
                cwd: '.'
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            test: {
                files: [
                    {src: './dist', dest: dirs.test.lib + '/<%= meta.name %>/dist'},
                    {src: './src', dest: dirs.test.lib + '/<%= meta.name %>/src'},
                    {src: './lib/qunit', dest: dirs.test.lib + '/qunit'}
                ]
            }
        },
        typescript: {
            build: {
                src: [
                    'typings/*.d.ts',
                    'src/_Version.ts',
                    'src/**/*.ts'
                ],
                dest: 'dist/<%= meta.name %>.js',
                options: {
                    target: 'es5',
                    declaration: true,
                    sourceMap: true
                }
            },
            test: {
                src: [
                    'typings/*.d.ts',
                    '<%= dirs.test.root %>/**/*.ts',
                    '!<%= dirs.test.root %>/lib/**/*.ts'
                ],
                dest: dirs.test.build,
                options: {
                    target: 'es5',
                    basePath: dirs.test.root,
                    module: 'amd',
                    sourceMap: true
                }
            }
        },
        qunit: {
            all: ['<%= dirs.test.root %>/*.html']
        },
        connect: {
        },
        watch: {
        },
        open: {
        },
        version: {
            bump: {},
            apply: {
                src: './build/_VersionTemplate._ts',
                dest: './src/_Version.ts'
            }
        }
    });

    grunt.registerTask('default', ['typescript:build']);
    grunt.registerTask('test', ['typescript:build', 'typescript:test', 'qunit']);
    setup(grunt);
    version(grunt);
    grunt.registerTask('lib:reset', ['clean', 'setup', 'symlink:test']);
    grunt.registerTask('dist:upbuild', ['version:bump', 'version:apply', 'typescript:build']);
    grunt.registerTask('dist:upminor', ['version:bump:minor', 'version:apply', 'typescript:build']);
    grunt.registerTask('dist:upmajor', ['version:bump:major', 'version:apply', 'typescript:build']);

};