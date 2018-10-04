// ES5 Methodz
const TypeWriter = function(txtElement, words, wait = 3000){
  this.txtElement = txtElement
  this.words = words
  this.txt = ''
  this.wordIndex = 0
  this.wait = parseInt(wait, 10)
  this.type()
  this.isDeleting = false
}

// Type Method
TypeWriter.prototype.type = function(){
  // Current Index of word
  const current = this.wordIndex % this.words.length
  // Get full text of current word
  const fullTXT = this.words[current]

  // Check if word is being deleted
  if(this.isDeleting){
    // Remove a character
    this.txt = fullTXT.substring(0, this.txt.length - 1)
  }else{
    // Adding a character
    this.txt = fullTXT.substring(0, this.txt.length + 1)
  }

  // Insert TXT into Element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

  // Initial Type Speed
  let typeSpeed = 300

  if(this.isDeleting){
    typeSpeed /= 2
  }

  // If word is complete
  if(!this.isDeleting && this.txt === fullTXT){
    // Cause a pause at the end
    typeSpeed = this.wait
    // Set delete to true
    this.isDeleting = true
  } else if(this.isDeleting && this.txt === ''){
    this.isDeleting = false
    // Move to next word
    this.wordIndex++
    // Pause before start typing
    typeSpeed = 500
  }

  setTimeout(()=> {this.type()}, typeSpeed)
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init)

function init(){
  const txtElement = document.querySelector('.txt-type')
  const words = JSON.parse(txtElement.getAttribute('data-words'))
  const wait = txtElement.getAttribute('data-wait')
  new TypeWriter(txtElement, words, wait)
}


// ES6 Method

