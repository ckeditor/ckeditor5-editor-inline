/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals console:false, document, window */

import InlineEditor from '../../src/inlineeditor';
import ArticlePluginSet from '@ckeditor/ckeditor5-core/tests/_utils/articlepluginset';

import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';

const wrapper = document.getElementById( 'wrapper' );
const options = [
	{
		label: 'Regular Root in <div>',
		isBlock: true,
		source: '<div id="editor"><p>This is the editor in the div element.</p></div>'
	},
	{
		label: 'Regular Root in <section>',
		isBlock: true,
		source: '<section id="editor"><p>This is the editor in the section element.</p></div>'
	},
	{
		label: 'Regular Root in <article>',
		isBlock: true,
		source: '<section><h2>My Blog Posts</h2><article id="editor"><header><p>Article Title</p></header><p>content</p></article>' +
			'<aside><p>Author info</p></aside></section>'
	},
	{
		label: 'Regular Root in <a>',
		isBlock: true,
		source: '<a id="editor" href="http://ckeditor.com"><p>This is the editor in the block anchor.</p><ul><li>List item 1</li></ul></a>'
	},
	{
		label: 'Inline Root in <p>',
		source: '<p id="editor">This is the editor in the inline paragraph.</p>'
	},
	{
		label: 'Inline Root in <h1>',
		source: '<h1 id="editor">This is the editor in the inline header 1.</h1>'
	},
	{
		label: 'Inline Root in <a>',
		source: '<a id="editor" href="http://ckeditor.com">This is <strong>the editor in t<em>he inline</em></strong><em> anch</em>or.</a>'
	},
	{
		label: 'Inline Root in <figcaption>',
		source: '<figure><img src="https://ckeditor.com/docs/assets/img/ckeditor-5.svg" width="100" height="100"><figcaption id="editor">' +
			'CKE5 Logo</figcaption></figure>'
	},
	{
		label: 'Inline Root in <span>',
		source: '<p><span id="editor">This is <strong>the <a href="https://ckeditor.com">editor</a> in t<em>he inline</em></strong>' +
			'<em> span</em>.</span></p>'
	},
	{
		label: 'Inline Root in <dd>',
		source: '<dl><dt>title</dt><dd id="editor">This is the editor in the dd inline element.</dd></dl>'
	},
	{
		label: 'Inline Root in <td>',
		source: '<table class="my-table"><thead><tr><th colspan="2">The table header</th></tr></thead><tbody><tr>' +
			'<td id="editor">The table body</td><td>with two columns</td></tr></tbody></table>'
	},
	{
		label: 'Inline Root in <label>',
		source: '<label id="editor" for="checkbox">Checkbox label</label><input type="checkbox" id="checkbox">'
	},
	{
		label: 'Inline Root in <ol>',
		source: '<ol id="editor"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ol>'
	}
];

function initEditor( config ) {
	if ( window.editor && window.editor.state !== 'destroyed' ) {
		window.editor.destroy();
	}

	wrapper.innerHTML = config.source;

	InlineEditor
		.create( wrapper.querySelector( '#editor' ), {
			plugins: [ ArticlePluginSet, Font, Highlight, Underline, Code ],
			useInlineRoot: config.isBlock ? false : true,
			toolbar: [
				'heading',
				'fontFamily',
				'fontSize',
				'fontColor',
				'fontBackgroundColor',
				'|',
				'bold',
				'italic',
				'underline',
				'code',
				'link',
				'highlight',
				'bulletedList',
				'numberedList',
				'blockQuote',
				'insertTable',
				'undo',
				'redo'
			]
		} )
		.then( editor => {
			window.editor = editor;
		} )
		.catch( err => {
			console.error( err.stack );
		} );
}

const form = document.getElementById( 'select-editor' );

options.forEach( ( config, index ) => {
	const label = document.createElement( 'label' );
	const input = document.createElement( 'input' );

	input.name = 'editor';
	input.type = 'radio';
	input.value = index;

	label.appendChild( input );
	label.appendChild( document.createTextNode( config.label ) );

	form.appendChild( label );
} );

form.addEventListener( 'change', evt => {
	const index = evt.target && parseInt( evt.target.value, 10 );

	if ( typeof index == 'number' ) {
		initEditor( options[ index ] );
	}
} );
