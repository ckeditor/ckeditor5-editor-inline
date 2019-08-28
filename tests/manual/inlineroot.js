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

let currentIndex;
const wrapper = document.getElementById( 'wrapper' );
const options = [
	{
		label: '-- select editor type --'
	},
	{
		label: 'Regular Root over the <div>',
		isBlock: true,
		source: '<div id="editor"><p>This is the editor created over the div element.</p></div>'
	},
	{
		label: 'Regular Root over the <section>',
		isBlock: true,
		source: '<section id="editor"><p>This is the editor created over the section element.</p></div>'
	},
	{
		label: 'Regular Root over the <article>',
		isBlock: true,
		source: '<section><h2>Section header</h2><article id="editor"><header><h2>Article Title</h2></header><p>Article\'s content.</p>' +
			'<p>You can edit this content</p>' +
			'</article><aside><p>Aside info</p></aside></section>'
	},
	{
		label: 'Regular Root over the <a> with the block elements',
		isBlock: true,
		source: '<a id="editor" href="http://ckeditor.com"><section><h2>Wrapped section with link</h2><p>The entire section ' +
			'is wrapped with the anchor which has initialized editor and contains other allowed block elements</p><table><tr><td>1.1</td>' +
			'<td>1.2</td></tr><tr><td>2.1</td><td>2.2 with list:<ul><li>Item 1</li><li>Item 2</li></ul></td></tr></table></section>'
	},
	{
		label: 'Inline Root over the <p>',
		source: '<p id="editor">This is the editor created over the paragraph.</p>'
	},
	{
		label: 'Inline Root over the <h1>',
		source: '<h1 id="editor">This is the editor created over the header 1.</h1>'
	},
	{
		label: 'Inline Root over the <a> with the inline elements only',
		source: '<a id="editor" href="http://ckeditor.com">This is the editor created over the inline anchor, which contains: ' +
			'<strong>strong</strong> elements, <em>emphasis</em> elements, or <strong><em>combination</strong></em> of them.</a>'
	},
	{
		label: 'Inline Root over the <figcaption>',
		source: '<figure><img src="https://ckeditor.com/docs/assets/img/ckeditor-5.svg" width="100" height="100"><figcaption id="editor">' +
			'This is the editor created over the figcaption element for CKE5 Logo</figcaption></figure>'
	},
	{
		label: 'Inline Root over the <span>',
		source: '<p>This is some text in paragraph before span with editor. <span id="editor">This is the editor created inside the span' +
			'element, which contains <a href="https://cksource.com">the link</a> and some styled content with ' +
			'<span style="background-color:black;color:lightgrey;">some background and some colored text</span>. There are also ' +
			'<strong>strong</strong>, <u>underline</u> and <code>code</code> fragments.</span> Here is some text in paragraph ' +
			'after the span.</p>'
	},
	{
		label: 'Inline Root over the <dd>',
		source: '<dl><dt>descriptive term</dt><dd id="editor">This is the editor created over the dd element.</dd></dl>'
	},
	{
		label: 'Inline Root over the <td>',
		source: '<table class="my-table"><thead><tr><th colspan="2">The table header</th></tr></thead><tbody><tr>' +
			'<td id="editor">Table cell where is initialized the editor instance.</td><td>Second cell which is not editable.</td></tr>' +
			'</tbody></table>'
	},
	{
		label: 'Inline Root over the <label>',
		source: '<label id="editor" for="checkbox">The editor created over the checkbox label.</label><input type="checkbox" id="checkbox">'
	},
	{
		label: 'Inline Root over the <ol>',
		source: '<ol id="editor"><li>The editor should be intialized over the ol element.</li><li>Item 2</li><li>Item 3</li></ol>'
	}
];

function initEditor( config ) {
	destroyEditor();

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

function destroyEditor() {
	if ( window.editor && window.editor.state !== 'destroyed' ) {
		window.editor.destroy();

		if ( currentIndex > 0 ) {
			options[ currentIndex ].source = wrapper.innerHTML;
		}
	}
}

const select = document.getElementById( 'editor-select' );

options.forEach( ( config, index ) => {
	const option = document.createElement( 'option' );

	option.value = index;
	option.text = config.label;

	select.appendChild( option );
} );

select.addEventListener( 'change', evt => {
	const index = evt.target && parseInt( evt.target.value, 10 );

	if ( typeof index == 'number' && options[ index ].source ) {
		initEditor( options[ index ] );
		currentIndex = index;
	} else {
		destroyEditor();
	}
} );
