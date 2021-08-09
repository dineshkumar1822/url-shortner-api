const addButton = document.querySelector('.search button');
const itemInput = document.getElementById('usr');
const urls = document.querySelector('.url div');
const error = document.getElementById('please');
const body = document.querySelector('body');
addButton.addEventListener('click',shortenLink);
function shortenLink(e) {
    const link = itemInput.value;
  
    if(link === ''){
      error.style.visibility = 'visible';
      itemInput.style.border = '1px solid red'
      itemInput.classList.add('red')
    } else {
      error.style.visibility = 'hidden'
      itemInput.classList.remove('red')
      itemInput.style.border = 'unset'
    
  
      // console.log(link);
      fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer f9328cfa962461517d946be606d00f71fd34dd32',
            'Content-Type': 'application/json'
        },
          body: JSON.stringify({ "long_url": link, "domain": "bit.ly"})
        }).then(function(res){
        // console.log("hi",res);
      return res.json();
      }).then(function(data){
    //   console.log("bye"data);
      addItems(data.id, link);
       
      }).catch(function(err){
      console.log(err);
    
      }) 
    }
  
    
    itemInput.value = ''
  
    e.preventDefault();
  }    



function addItems(slink,llink){
    // console.log("t",text);
    const item = document.createElement('ul');
    item.innerHTML = 
    `
   
        <li class="text">${llink}</li>
    
        <li class="slink" id="slink">${slink}</li>
    
        <li id="cb"><button id="copy" class="btn cpb" onclick="copyDivToClipboard()">copy</button></li>
  
    `;
   
    urls.append(item);
    
}


    function copyDivToClipboard() {
        var range = document.createRange();
        range.selectNode(document.getElementById("slink"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
        document.getElementById("copy").innerText="copied";
        document.getElementById("copy").style.background="hsl(257, 27%, 26%)";
    }


