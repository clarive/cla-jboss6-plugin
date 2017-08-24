# JBoss 6 Plugin

The JBoss 6 plugin will allow you to interact with the JBoss server performing and undoing deployments.

## Requirements

There are no requirements outlined in Clarive in order to work with this plugin.

## Installation

To install the plugin, place the `cla-jboss6-plugin` folder inside the `CLARIVE_BASE/plugins` directory in
a Clarive instance.

## How to Use

Once the plugin is correctly installed, you will have a new palette service called 'JBoss 6 Application Server'.


### JBoss 6 Application Server

This palette service will enable you to use commands that allow you to interact with the Jboss server.  The main
fields are:

- **Server** - Server where Jboss is installed.
- **JBoss path** - Path to Jboss folder.
- **Functions** - List of JBoss functions that you can use.
- **Credentials** - Add the credentials for JBoss Server.
- **Hostname** - Name of the remote server.
- **File Path** - File path to deploy or undeploy.
- **Custom Params** - Parameters that can be used by command line.

Configuration start example:

    Server CI: GenericServer
    JBoss Path: /usr/share/jboss-6-Final
    Functions: start
    Custom Params: -c default -b 0.0.0.0

Due to the possible delay in starting the Jboss server, it is advisable to add a timeout if you then wish to perform
a deployment service.
    
Configuration deployment example:

    Server CI: GenericServer
    JBoss Path: /usr/share/jboss-6-Final
    Functions: deploy
    Credentials: 
        username: user
        password: ***
    Hostname: 193.192.32.1
    File Path: /tmp/example.war 

  If the JBoss server reboots, the deployment should be performed again.

- **Errors and output** - These two fields concern management of control errors. Their options are:
   - **Fail and output error** - Search for configured error pattern in script output. If found, an error message is
     displayed in the monitor showing the match.
   - **Warn and output warn** - Search for configured warning pattern in script output. If found, an error message is
     displayed in the monitor showing the match.
   - **Custom** - Where combo errors is set to custom, a new form is displayed for defining using the following fields:
      - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in the
        monitor.
      - **Warn** - Range of return code values to warn the user. A warning message will be displayed in the monitor.
      - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the
        monitor.
   - **Silent** - Silence all errors found.





