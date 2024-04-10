module.exports = {
    apps: [
        {
            name: 'NuxtInscriptions',
            port: '3000',
            host: '0.0.0.0',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
