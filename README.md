# graphQL-learn

graphQL learn

## usage

1. query

```js
// 查询 user（含 filter）
query {
  userList {
    result
    data {
      name
      age
      gender
    }
  }
}

query {
  userList(payload: {
    gender: MALE # enum
  }) {
    result
    data {
      name
    }
  }
}

// 登录
query {
  login(payload: {
    name: "lawler"
    password: "111111"
  }) {
    result
    data {
      name
    }
  }
}
```

2. mutation

```js
// 增加用户
mutation {
  addUser(payload: {
    name: "lawler"
    password: "111111"
    gender: MALE # enum
    age: 10
  }) {
    result
    data {
      name
    }
  }
}

// 删除用户
mutation {
  deleteUser(name: "lawler") {
    result
  }
}

// 更新用户
mutation {
  updateUser(name: "lawler", payload: {
    name: "natalie"
    gender: FEMALE
    age: 20
  }) {
    result
    data {
      name
    }
  }
}
```

## TODOs

- [x] 搭建 graph server，连接 mongodb 数据库

- [x] 实现 user 的增删查改 + 登录

- [] apollo client + react hooks

- [] graphql 语法 generate TS
