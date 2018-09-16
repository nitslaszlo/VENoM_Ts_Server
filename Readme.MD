## Start/stop MongoDB service from commad prompt:
- net start MongoDB
- net stop MongoDB

## Enable MongoDb security:
> c:\Program Files\MongoDB\Server\4.0\bin\mongod.cfg<br>
> ...<br>
> security:<br>
> authorization: enabled<br>
> ...<br>

>db.createUser(<br>
>{<br>
>  user: "nits",
>  pwd: "Abc123456",<br>
>  roles:["root"]<br>
>})<br>
