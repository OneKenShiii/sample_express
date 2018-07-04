const child = require('child_process');
const gulp = require('gulp');
const gulpTypeScript = require('gulp-typescript');
const gulpTslint = require('gulp-tslint');
const { Linter } = require('tslint');

const TS_FILE_GLOB_LIST = [
    './**/*.ts',
    '!./node_modules/**/*.ts',
];
const gulpTypeScriptProject = gulpTypeScript.createProject('tsconfig.json');
const mockServer = { kill: () => {} };
const spawnStore = { server: mockServer };
const callBeforeExit = [];

gulp.task('lint-ts-file', () => {
    const program = Linter.createProgram('tsconfig.json');

    return gulp
    .src(TS_FILE_GLOB_LIST)
    .pipe(gulpTslint({ formatter: 'stylish', program }))
    .pipe(gulpTslint.report({ allowWarnings: true }));
});

gulp.task('compile-ts-file', () => gulp
    .src(TS_FILE_GLOB_LIST)
    .pipe(gulpTypeScriptProject())
    .pipe(gulp.dest('./'))
);

gulp.task('build-ts-file', gulp.series('lint-ts-file', 'compile-ts-file'));

gulp.task('run-server', (done) => {
    spawnStore.server.kill();
    spawnStore.server = child.spawn('node', ['./server.js'], {
        stdio: 'inherit',
        env: process.env,
    });
    done();
});

gulp.task('default', gulp.series('build-ts-file', 'run-server', function watching(done) {
    callBeforeExit.push(done);

    gulp.watch(TS_FILE_GLOB_LIST, gulp.parallel(
        gulp.series('build-ts-file', 'run-server'),
    ));
}));

function stopGulp(signal) {
    console.log(signal);

    try {
        callBeforeExit.forEach((call) => call());
        spawnStore.server.kill();
        process.exit(0);
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
}
['SIGTERM', 'SIGINT', 'SIGQUIT', 'SIGHUP'].forEach((signal) => {
    process.on(signal, stopGulp.bind({}, signal));
});
