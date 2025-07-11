## SSH Login
```Shell
cat ~/.ssh/id_rsa.pub | ssh user@ip 'mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'

```

## Check Disk Usage of Same File System, note the '/' and 'x'
```Shell 
du -hxd1 / | sort -h
```

