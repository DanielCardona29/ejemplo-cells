import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './RickAndMorty-styles.js';

import '@bbva-web-components/bbva-button-default/bbva-button-default';
import '@bbva-web-components/bbva-card-photo/bbva-card-photo';
import '@bbva-web-components/bbva-form-search/bbva-form-search';
import '@bbva-web-components/bbva-web-navigation-pagination/bbva-web-navigation-pagination';

import './components/ryck-and-morty-dm/rick-and-morty-dm.js';
import './components/modal/modal-template-open.js';


export class RickAndMorty extends LitElement {
  static get is() {
    return 'rick-and-morty';
  }

  //Estilos
  static get styles() {
    return [styles, getComponentSharedStyles('rick-and-morty-shared-styles')];
  }

  // Declare properties
  static get properties() {
    return {
      name: { type: String },
      info: { type: Object },
      results: { type: Object },
      isLoading: { type: Boolean },
      searchValue: { type: String },

      host: { type: String },
      path: { type: String },
      method: { type: String },
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.name = 'Rick and Morty cells';
    this.isLoading = true;
    this.searchValue = '';


    //Informacion de la api
    this.host = 'https://rickandmortyapi.com';
    this.path = 'api/character';
    this.method = 'get';

    this.info = {};
    this.results = [];
    this.selectedCharacter = {};
  }


  //Envia al estado
  setState(newState) {
    this.info = newState.info;
    this.results = newState.results;
  }


  setSecondRes(newState) {
    this.info = newState.info;
    const results = this.results;
    this.results = results.concat(newState.results);
  }


  //Hace la conexion a la api
  _apiCall() {
    const _dm = this.shadowRoot.querySelector('#rickdm');
    _dm.getCharacters()
      .then((res) => {
        this.setState(res);
        this.isLoading = false;
      });
  }


  _secondApiCall(path) {
    const _dm = this.shadowRoot.querySelector('#rickdm');

    _dm.getCharacters(path ? path : "")
      .then((res) => {
        this.setSecondRes(res);
      });
  }

  //Procesa los resultado correctos de la api
  onRequestSuccess(res) {
    this.results = res.detail.results;
    this.info = res.detail.info;
    this.isLoading = false;
  }

  //Hace el filtro de busqueda de los personajes
  onSearch(event) {
    const value = event.target.value;
    this.searchValue = value;
  }

  _openModal(character) {
    const _modal = this.shadowRoot.querySelector('#modal-template');
    _modal.openModal(character);
  }

  //imprime los resultados del llamado a la apu
  mapResults() {

    const characters = this.results;

    const filtredCharacters = characters.filter((character) => character.name.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()));

    const characterMap = filtredCharacters.map((character) => {
      return html`
        <div class="card-edit">
          <bbva-card-photo .cardText=${`${character.species} - ${character.gender} - ${character.status}`}
            .cardTitle=${character.name} .image=${character.image} @click=${()=> this._openModal(character)}></bbva-card-photo>
        </div>
      `});

    return characterMap;
  }

  //imprime cuando esta cargando algo ded la api
  mapLoading() {
    const elements = []

    for (let i = 0; i < 2; i++) {
      elements.push(html`
        <div class="card-edit">
          <bbva-card-photo loading></bbva-card-photo>
        </div>
    `)
    }
    return elements;
  }

  // Define a template
  render() {

    return html`      
    <rick-and-morty-dm id="rickdm" .host=${this.host} .method=${this.method} .path=${this.path}></rick-and-morty-dm>
    
    <modal-template id="modal-template"></modal-template>
    
    <div class="button-wrapper">
      <bbva-button-default @click=${this._apiCall}>Get Characterss</bbva-button-default>
    </div>
    
    <div class="case">
      <bbva-form-search label="Buscar personaje" required="" @input=${this.onSearch}></bbva-form-search>
    </div>
    
    ${this.isLoading ? this.mapLoading() : this.mapResults()}
    
    <div class="button-wrapper">
      <bbva-button-default @click=${() => this._secondApiCall(this.info.next.split('.com')[1])}>Load more characters
      </bbva-button-default>
    </div>
    
    `;
  }
}
