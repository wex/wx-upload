import styles from '../css/layout.scss';

class WxUpload extends HTMLElement {

  constructor() 
  {
    super();

    // Add a shadow DOM
    const shadowDOM = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');

    template.innerHTML = `
<style>${styles.toString()}</style>
<div class="wx-upload">
  <label class="wx-upload__container">
      <span class="wx-upload__container--placeholder">
        ${this.attributes.placeholder ? this.attributes.placeholder.value : "No image chosen"}
      </span>
      <img class="wx-upload__container--preview" src="" alt="">
      ${this.attributes.remove ? `<button class="wx-upload__container--remove">&times;</button>` : ''}
  </label>
</div>`;

    // Render the template
    shadowDOM.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() 
  {
    return ['valid', 'invalid'];
  }

  attributeChangedCallback(name, prev, next)
  {
    console.log( name );
    console.log( prev );
    console.log( next );

    switch (name) {

      case 'invalid':
        this.classList.remove('is-valid');
        
        if (next === null) {
          this.classList.remove('is-invalid');
        } else {
          this.classList.add('is-invalid');
        }
        return;

      case 'valid':
        this.classList.remove('is-invalid');

        if (next === null) {
          this.classList.remove('is-valid');
        } else {
          this.classList.add('is-valid');
        }
        return;

    }
  }
  
  connectedCallback() 
  {
    // remove::click
    const remove = this.shadowRoot.querySelector('button.wx-upload__container--remove');
    if (remove) remove.onclick = this.onRemove.bind(this);

    // input::change
    this.inputElement = this.createInput();
    this.inputElement.onchange = this.onImageSet.bind(this);

    // browse::click
    const browse = this.shadowRoot.querySelector('.wx-upload__container');
    browse.onclick = this.onBrowse.bind(this);
  }

  createInput()
  {
    const template  = document.createElement('template');
    template.innerHTML = `<input style="display: none;" type="file" name="${this.attributes.name ? this.attributes.name.value : "image"}" accept="image/*">`;

    const input     = template.content.cloneNode(true);
    
    const form      = this.closest("form") || this.parentNode;

    form.appendChild(input);

    return form.childNodes[ form.childNodes.length - 1 ];
  }

  onImageSet(e)
  {
    const input = e.target;

    const preview = this.shadowRoot.querySelector('img.wx-upload__container--preview');

    const container = this.shadowRoot.querySelector('.wx-upload');

    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = (ev) => {
        preview.src = ev.target.result;
        this.classList.add('has-image');
        container.classList.add("has-image");
      };
      reader.readAsDataURL( input.files[0] );
    } else {
      preview.src = "";
      this.classList.remove('has-image');
      container.classList.remove("has-image");
    }
  }

  onBrowse(e)
  {
    e.preventDefault();
    e.stopPropagation();

    this.inputElement.click();    
  }

  onRemove(e) 
  {
    e.preventDefault();
    e.stopPropagation();

    const input     = this.inputElement;

    const preview   = this.shadowRoot.querySelector('img.wx-upload__container--preview');

    const container = this.shadowRoot.querySelector('.wx-upload');

    input.value = null;

    preview.src = "";

    container.classList.remove("has-image");
    this.classList.remove('has-image');
  }
}

export default WxUpload;
