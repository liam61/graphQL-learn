# graphQL-learn

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
// 增加 user
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

// 删除 user
mutation {
  deleteUser(name: "lawler") {
    result
  }
}

// 更新 user
mutation {
  updateUser(name: "lawler", payload: {
    name: "natalie"
    gender: FEMALE
  }) {
    result
    data {
      name
    }
  }
}
```

## TODOs

- [x] 搭建 graphql server，连接 mongodb

- [x] 实现 user 的增删查改 + 登录

- [x] apollo client + react hooks

- [x] 父组件使用 mobx 管理受控的 input 子组件

- [ ] graphql 语法 generate ts
