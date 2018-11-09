module.exports = {
    apps: [{
        name: 'app',
        script: './server/app.js',
        cwd: './',
        // 监控变化的目录，一旦变化，自动重启
        watch: [
            'server',
        ],
        // 从监控目录中排除
        ignore_watch: [

        ],
        // 错误日志路径
        error_file: './logs/app-err.log',
        // 普通日志路径
        out_file: './logs/app-out.log',
        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        args: 'one two',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }],

    deploy: {
        production: {
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/production',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
        }
    }
};
