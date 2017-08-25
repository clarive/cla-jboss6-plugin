(function(params) {

    var data = params.data || {};

    var serverCombo = Cla.ui.ciCombo({
        name: 'server',
        value: data.server || '',
        class: 'BaselinerX::CI::generic_server',
        fieldLabel: _('Server'),
        allowBlank: false,
        with_vars: 1
    });

    var pathJboss = Cla.ui.textField({
        name: 'path',
        fieldLabel: _('Jboss Path'),
        value: data.path || '',
    });


    var args = Cla.ui.comboBox({
        name: 'arg',
        fieldLabel: _('Functions'),
        value: data.arg || [],
        data: [
            ['start', 'start'],
            ['stop', 'stop'],
            ['deploy', 'deploy'],
            ['undeploy', 'undeploy'],
            ['status', 'status']
        ],
        singleMode: true,
        allowBlank: false
    });
    args.on('addItem', function() {
        var v = args.getValue();
        if (v == 'start') {
            customParams.show();
            customParams.setValue('-c default -b 0.0.0.0');
            credentials.hide();
            hostname.hide();
            file.hide();
        } else if (v == 'stop') {
            customParams.show();
            customParams.setValue('-S');
            credentials.show();
            credentials.doLayout();
            hostname.hide();
            file.hide();
        } else if (v == 'deploy' || v == 'undeploy') {
            hostname.show();
            file.show();
            credentials.show();
            credentials.doLayout();
            customParams.hide();
        } else if (v == 'status') {
            hostname.show();
            credentials.show();
            credentials.doLayout();
            customParams.hide();
            file.hide();
        }
    });


    var customParams = Cla.ui.arrayGrid({
        name: 'customParams',
        fieldLabel: _('Custom Params'),
        value: data.customParams,
        description: _('Custom commands or arguments'),
        hidden: true,
        default_value: '.'
    });

    var hostname = Cla.ui.textField({
        name: 'hostname',
        fieldLabel: _('Hostname'),
        value: data.hostname || '',
        hidden: true
    });
    var file = Cla.ui.textField({
        name: 'file',
        fieldLabel: _('File Path'),
        value: data.file || '',
        hidden: true
    });

    var credentials = Cla.ui.panel({
        layout: 'column',
        fieldLabel: _('Credentials'),
        frame: true,
        hidden: (!data.arg || data.arg == 'start'),
        items: [{
            layout: 'form',
            columnWidth: .50,
            labelAlign: 'top',
            frame: true,
            items: {
                xtype: 'textfield',
                anchor: '100%',
                fieldLabel: _('Username'),
                name: 'username',
                value: data.username || ''
            }
        }, {
            layout: 'form',
            columnWidth: .50,
            labelAlign: 'top',
            frame: true,
            items: {
                xtype: 'textfield',
                anchor: '100%',
                fieldLabel: _('Password'),
                name: 'password',
                inputType: 'password',
                value: data.password || ''
            }
        }]
    });

    var errors = Cla.ui.errorManagementBox({
        errorTypeName: 'type',
        errorTypeValue: params.data.type || 'warn',
        rcOkName: 'ok',
        rcOkValue: params.data.ok,
        rcWarnName: 'warn',
        rcWarnValue: params.data.warn,
        rcErrorName: 'error',
        rcErrorValue: params.data.error,
        errorTabsValue: params.data
    });

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            serverCombo,
            pathJboss,
            args,
            credentials,
            hostname,
            file,
            customParams,
            errors,
        ]
    });

    return panel;
})