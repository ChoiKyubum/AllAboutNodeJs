const assert = require('assert');
const print = require('./print');

// deepEqual은 enumerable 한 '소유 속성'만 추상비교 하기때문에 의외의 결과가 나오기도 합니다.

print('간단한 Paradox', () => {
  const regex = /test/gi;
  const date = new Date();

  const regexProps = Object.keys(regex);
  const dateProps = Object.keys(date);

  // regex == date는 false 이지만 두 객체의 property 들이 모두 []이기 때문에 아래 assertion 은 pass 하게 됩니다.
  // 이처럼 deepEqual은 객체의 '소유 속성'만으로 두 객체를 비교함을 알 수 있습니다.
  console.log('regexProps:', regexProps, 'dateProps:', dateProps);
  assert.deepEqual(regex, date);
});

print('Paradox 2', () => {
  // 위와 같은 방식으로 {}, 와 [] 의 assertion 도 pass 하게 됩니다.
  assert.deepEqual({}, []);
});

const obj1 = {
  a: {
    b: 1
  }
};

print('자신과의 비교', () => {
  // 자신과의 비교는 당연히 pass 합니다.
  assert.deepEqual(obj1, obj1);
});

print('다른 값을 가진 object의 비교', () => {
  const obj2 = {
    a: {
      b: 2
    }
  };
  // obj.a.b의 값이 다르기 때문에 AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } } 가 발생합니다.
  // deepEqual은 이처럼 nested 한 값까지 비교 합니다.
  assert.deepEqual(obj1, obj2);
});

print('따로 생성 된 같은 값을 가진 object의 비교', () => {
  const obj3 = {
    a: {
      b: 1
    }
  };

  // obj1 == obj3 은 false 이지만 모든 property들이 같은 값을 가지기 때문에 pass합니다.
  assert.deepEqual(obj1, obj3);
});

print('prototype의 비교', () => {
  const obj4 = Object.create(obj1);
  // AssertionError: { a: { b: 1 } } deepEqual {}
  // Object.getPrototpeOf(obj4) 는 { a: {b: 1 } }이지만 deepEqual은 prototype을 비교하지는 않기때문에 fail 됩니다.
  assert.deepEqual(obj1, obj4);
});
