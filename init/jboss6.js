var reg = require('cla/reg');

reg.register('service.jboss6.server', {
    name: 'Jboss 6 Application Server',
    icon: '/plugin/cla-jboss6-plugin/icon/jboss6.svg',
    form: '/plugin/cla-jboss6-plugin/form/jboss-form.js',
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
        return output;
    }
});