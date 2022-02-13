// ##### Prototypal Inheritance
// Object.create

// Prototype Chain: mikesPoem < poem < artwork < Object

// artwork is an object, created with the object literal syntax
// it implicitly uses Object prototype
const artwork = { 
  describe: function() { console.log('Introducing '+this.name+' by '+this.creator) } 
}

// poem is an object 
// 1. based on 'artwork' prototype (first argument)
// 2. adding a property descriptor (second argument) 
//    defining one property 'recite' which is a function
const poem = Object.create(artwork, { 
  recite: { value: function() { console.log('Reciting '+this.name+' by '+this.creator) } }
})

// mikesPoem is an object 
// 1. based on 'poem' prototype (first argument)
// 2. adding a property descriptor (second argument) 
//    defining two properties which are strings
let mikesPoem = Object.create(poem, { 
  name: { value: 'Great Poem' }, 
  creator: { value: 'Michael the Great' } 
})

mikesPoem.describe()
mikesPoem.recite()

// Output:
// Introducing Great Poem by Michael the Great
// Reciting Great Poem by Michael the Great