# JBoss 6 Plugin

<img src="https://cdn.rawgit.com/clarive/cla-jboss6-plugin/master/public/icon/jboss6.svg?sanitize=true" alt="JBoss 6 Plugin" title="JBoss 6 Plugin" width="120" height="120">

The JBoss 6 plugin will allow you to interact with the JBoss server performing and undoing deployments.

## Requirements

There are no requirements outlined in Clarive in order to work with this plugin.

## Installation

To install the plugin, place the `cla-jboss6-plugin` folder inside the `$CLARIVE_BASE/plugins` directory in
a Clarive instance.

### JBoss 6 Application Server

The various parameters are:

- **Server (variable name: server)** - Server where JBoss is installed.
- **User (user)** - User which will be used to connect to the server.
- **JBoss path (path)** - Path to JBoss folder.
- **Functions (arg)** - List of JBoss functions that you can use.
   - **start ("start")** - Starts JBoss service.
   - **stop ("stop")** - Stops JBoss service.
   - **deploy ("deploy")** - Deploys JBoss service.
   - **undeploy ("undeploy")** - Undeploys JBoss service.
   - **status ("status")** - Gets JBoss service status.
- **Credentials** - Add the credentials for JBoss Server.
   - **Username ("username")** - Username for JBoss service.
   - **Password ("password")** - Password for JBoss service.
- **Hostname (hostname)** - Name of the remote server.
- **File Path (file)** - File path to deploy or undeploy.
- **Custom Params (custom_args)** - Parameters that can be used by command line.

**Only Clarive EE**

- **Errors and output** - These two fields are related to manage control errors. Options are:
   - **Fail and output error** - Search for configurated error pattern in script output. If found, an error message is displayed in monitor showing the match.
   - **Warn and output warn** - Search for configurated warning pattern in script output. If found, an error message is displayed in monitor showing the match.
   - **Custom** - In case combo box errors is set to custom a new form is showed to define the behavior with these fields:
   - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in monitor.
   - **Warn** - Range of return code values to warn the user. A warn message will be displayed in monitor.
   - **Error** - Range of return code values for the script to have failed. An error message will be displayed in monitor.

## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Op Name: **JBoss 6 Application Server**

Configuration start example:

```yaml
    Server Resource: GenericServer
    JBoss Path: /usr/share/jboss-6-Final
    Functions: start
    Custom Params: -c default -b 0.0.0.0
```

Due to the possible delay in starting the JBoss server, it is advisable to add a timeout if you then wish to perform
a deployment service.
    
Configuration deployment example:

```yaml
    Server Resource: GenericServer
    JBoss Path: /usr/share/jboss-6-Final
    Functions: deploy
    Credentials: 
        username: user
        password: ***
    Hostname: 193.192.32.1
    File Path: /tmp/example.war 
```

If the JBoss server reboots, the deployment should be performed again.

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Example:

```yaml
do:
   - jboss6_task:
       server: 'jboss6_server'     # Required. Use the mid set to the resource you created
       user: 'clarive_user'
       path: '/usr/share/jboss-6-Final'
       arg: "start"                # Required.
       custom_args:["-c default", "-b 0.0.0.0"]
``` 

```yaml
do:
   - jboss6_task:
       server: 'jboss6_server'     # Required. Use the mid set to the resource you created
       user: 'clarive_user'
       arg: "deploy"               # Required.
       username: "jboss-user"
       password: "1232566"
       hostname: "193.192.32.1"
       file: "/tmp/example.war"
``` 

##### Outputs

###### Success

The service will return the console output for the command.

###### Possible configuration failures

**Task failed**

You will get the error from the console output.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "jboss6_task": "server"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Server` not available for op "jboss6_task"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.
