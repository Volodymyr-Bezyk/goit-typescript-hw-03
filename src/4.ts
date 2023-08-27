interface IKey {
  getSignature: () => number;
}
interface IPerson {
  getKey: () => Key;
}

class Key implements IKey {
  private signature: number;
  constructor() {
    this.signature = Math.random();
  }
  getSignature(): number {
    console.log("keySiganture", this.signature);
    return this.signature;
  }
}

class Person {
  private key: Key;
  constructor(key: Key) {
    this.key = key;
  }

  getKey() {
    console.log("PersonKey", this.key);
    return this.key;
  }
}

abstract class House {
  public door: boolean;
  public key: Key;
  public tenants: Person[];

  comeIn(person: Person): void {
    if (this.door === true) {
      this.tenants.push(person);
      console.log("tenants", this.tenants);
    }
  }
  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  constructor(key: Key) {
    super();
    this.key = key;
    this.tenants = [];
  }

  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("Door opened");
    } else {
      this.door = false;
      console.log("Door closed");
    }
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);
house.openDoor(person.getKey());
house.comeIn(person);

export {};
