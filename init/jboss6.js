var reg = require('cla/reg');

reg.register('service.jboss6.server', {
    name: 'Jboss 6 Application Server',
    icon: '/plugin/cla-jboss6-plugin/icon/jboss6.svg',
    form: '/plugin/cla-jboss6-plugin/form/jboss-form.js',
    rulebook: {
        moniker: 'jboss6_task',
        description: _('Executes a Gradle compilation'),
        required: ['server', 'arg'],
        allow: ['server', 'arg', 'path', 'custom_args', 'user', 'hostname', 'file', 
        'username', 'password', 'errors'],
        mapper: {
            'custom_args': 'customParams',
            'errors': 'type'
        },
        examples: [{
            jboss6_task: {
                server: 'jboss6_server',
                user: 'clarive_user',
                path: '/usr/share/jboss-6-Final',
                arg: "start",
                custom_args:["-c default", "-b 0.0.0.0"]
            }  
        },{
            jboss6_task: {
                server: 'jboss6_server',
                user: 'clarive_user',
                arg: "deploy",
                username: "jboss-user",
                password: "1232566",
                hostname: "193.192.32.1",
                file: "/tmp/example.war"
            }  
        }]
    },
    handler: function(ctx, params) {
        var ci = require("cla/ci");
        var log = require('cla/log');
        var reg = require('cla/reg');
        var jbossServer = params.server;
        var command = '';
        var pathJboss = params.path || '';
        var arg = params.arg || '';
        var customParams = params.customParams;
        var hostname = params.hostname || '';
        var username = params.username || '';
        var user = params.user || '';
        var password = params.password;
        var file = params.file || '';
        var ciServer = ci.findOne({
            mid: jbossServer + ''
        });

        if (!ciServer) {
            log.error(_("CI Server not found"));
            throw new Error(_('CI Server not found'));
        }

        if (arg == 'start') {
            command = 'nohup ' + pathJboss + '/bin/run.sh ' + customParams.join(" ") + ' > /dev/null 2>&1 > /dev/null &';
        } else if (arg == 'stop') {
            command = pathJboss + '/bin/shutdown.sh ';
            if (username && password) {
                command = command + '-u ' + username + ' -p ' + password;
            }
            command = command + ' ' + customParams.join(" ");;
        } else {
            command = pathJboss + '/bin/twiddle.sh ';
            if (username && password) {
                command = command + '-u ' + username + ' -p ' + password;
            }
            if (arg == 'status') {
                command = command + ' --host ' + hostname + ' query jboss.web.deployment:*';
            } else {
                command = command + ' --host ' + hostname + ' invoke "jboss.system:service=MainDeployer" ' + arg + ' file://' + file;
            }
        }

        log.debug(_("Command Jboss: ") + command);

        var output = reg.launch('service.scripting.remote', {
            name: 'Run Jboss script',
            config: {
                errors: params.type,
                server: params.server,
                user: params.user,
                home: params.home,
                path: command,
                output_error: params.output_error,
                output_warn: params.output_warn,
                output_capture: params.output_capture,
                output_ok: params.output_ok,
                meta: params.meta,
                rc_ok: params.ok,
                rc_error: params.error,
                rc_warn: params.warn
            }
        });
        return output.output;
    }
});