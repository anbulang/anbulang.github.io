---
title: Nginx-用GoAccess实现可视化并实时监控access日志
date: 2020-01-30 01:37:05
categories:
tags:
---

### 安装GoAccess

```shell
$ wget https://tar.goaccess.io/goaccess-1.3.tar.gz
$ tar -xzvf goaccess-1.3.tar.gz
$ cd goaccess-1.3/
$ ./configure --enable-utf8 --enable-geoip=legacy
$ make
# make install
```
<!-- more -->

### 运行GoAccess

#### 静态HTML页面

```shell
goaccess access.log -o report.html --log-format=COMBINED
```

#### 实时HTML页面

```shell
goaccess access.log -o /var/www/html/report.html --log-format=COMBINED --real-time-html
```

详情见[GoAccess官方文档](https://goaccess.io/get-started)

### 页面展示

![20200130015537.png](http://picgo.anbulang.cn/picgo/20200130015537.png)