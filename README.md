# Quilt Demo Blueprint

This repository contains the blueprint needed to run the Quilt MEAN stack
demo.  We've broken the blueprint into two different files:

- `inf.js`: This file defines a single function that returns an infrastructure
descrption.  In this case, the infrastructure is a set of Amazon EC2 instances,
and the function's single parameter describes the number of worker instances
to launch.  Workers are instances that can be used to run containers;
the infrastructure also includes a master instance that manages the Quilt
deployment.  While this particular file describes virtual machines on Amazon
EC2, an infrastructure can describe physical or virtual machines
on any cloud provider (Quilt currently supports GCE, AWS, Digital Ocean,
and Vagrant is coming soon).
- `mean.js`: This file uses `inf.js` to launch a set of instances, and deploys
a MEAN stack on those instances.  `mean.js` builds on other, existing Quilt
blueprints, including a blueprint describing how to run MongoDB, a blueprint
for Node.js, and a blueprint for HAProxy. Because those existing blueprints
describe how to run those respective services, all `mean.js` needs to do is to
hook the services together (e.g., by opening a connection between MongoDB
and the Node.js application).

## Running the demo code

If you would like to run this demo, you'll need to clone the repository
and make a few changes to the code (we're working on streamlining this
configuration process!).

### Installing and Configuring Quilt

If you've never used Quilt before, you'll need to install and configure
Quilt.  First, you'll need to install Node.js, which
Quilt relies on to run JavaScript blueprints.  The process for installing
Node.js is well documented on the
[Node.js website](https://nodejs.org/en/download/). One easy way to install
Node.js is using Homebrew:

```console
$ brew install node
```

Next, you'll need to install Quilt using Node's package manager:

```console
$ npm install -g quilt/install
```

To allow Quilt to launch Amazon EC2 instances, you need to use configure AWS.
The easiest way to do this is by setting environment variables:

```console
$ export AWS_ACCESS_KEY_ID=<your access key id>
$ export AWS_SECRET_ACCESS_KEY=<your secret access key>
```

You can also use any of the mechanisms allowed by the AWS CLI, which
are described in more detail in
[Amazon's documentation](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).

At this point, Quilt is installed, and you can use it to write your own
blueprint.

### Installing and running the demo

To run the demo blueprint, you'll also need to download and
install the demo code:

```console
$ git clone https://github.com/quilt/demos.git
$ cd demos
$ npm install
```

As-is, the JavaScript files in the demos repository  will launch infrastructure
that's only accessible via Github user e/jj's SSH keys. To make sure that you
can log into the machines, change line
10 of `inf.js` to have your github username instead of `ejj`, which will mean
that once the machines are launched, you can login to them using your Github SSH
key(s). If you don't have a GitHub ssh key,
[the Github documentation](https://help.github.com/articles/connecting-to-github-with-ssh/)
describes how to add one to your account.

Now you're ready to launch the demo! Quilt relies on a long-running
daemon (similar to the Docker daemon, for folks familiar with Docker) to keep
track of running Quilt deployments, so start by launching the daemon:

```console
$ quilt daemon
```

Now, in a new terminal window, run the blueprint:

```console
$ quilt run ./mean.js
```

`quilt run` will return immediately because it delegates to the Quilt daemon.
If you return to the terminal window running the Quilt daemon, you'll see that
Quilt is making some progress towards getting the demo Node.js application up
and running.  It will take Quilt a few minutes to launch VMs on EC2 and then
configure the relevant containers on those VMs. While you wait, you can check
the progress with:

```console
$ quilt ps
```

which lists running containers and machines. The last column of the `quilt ps`
output shows the public IP address of each container. Once the application is
up and running, you can view it using the public IP address of any of the
HAProxy instances.

Once you're finished experimenting with this demo, don't forget to shut down
the instances that are running! You can stop all running instances with
`quilt stop`:

```console
$ quilt stop
```

At this point, if you're done using Quilt, you can also kill the daemon
process.

## Next steps

If you're interested in using Quilt to launch other applications, check out our
[Getting Started Guide](https://github.com/quilt/quilt/blob/master/docs/GettingStarted.md).
If you're interested in writing your own blueprints, take a look at our
[Blueprint Writer's Guide](https://github.com/quilt/quilt/blob/master/docs/spec-writers-guide.md).

## Feedback

If you run into any hiccups or have feedback about using Quilt, we'd love to
hear from you! Shoot us an email at [dev@quilt.io](mailto:dev@quilt.io).

