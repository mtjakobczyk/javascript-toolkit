// ##### Prototypal Inheritance
// Class-syntax constructor functions

// Prototype Chain: mikesPoem < Poem < Artwork < Object

// Artwork is an object, it implicitly uses Object prototype
class Artwork {
  constructor (name, creator) {
    this.name = name
    this.creator = creator
  }
  describe () { console.log('Introducing '+this.name+' by '+this.creator) }
}

// Poem is an object based on 'Artwork' prototype
class Poem extends Artwork {
  constructor(name, creator) {
    super(name, creator)
  }
  recite () { console.log('Reciting '+this.name+' by '+this.creator) }
}

// mikesPoem is an object based on 'Poem' prototype
let mikesPoem = new Poem('Great Poem', 'Michael the Great')

mikesPoem.describe()
mikesPoem.recite()

// Output:
// Introducing Great Poem by Michael the Great
// Reciting Great Poem by Michael the Great