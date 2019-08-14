/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals console:false, document, window, CKEditorInspector */

import InlineEditor from '../../src/inlineeditor';
import ArticlePluginSet from '@ckeditor/ckeditor5-core/tests/_utils/articlepluginset';

import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';

const wrapper = document.getElementById( 'wrapper' );
const options = [
	{
		label: 'regular editor in div',
		isBlock: true,
		source: '<div id="editor"><p>This is the editor in the block element.</p></div>'
	},
	{
		label: 'inline root editor in p',
		source: '<p id="editor">This is the editor in the inline paragraph.</p>'
	}
];

function initEditor( config ) {
	if ( window.editor ) {
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
	label.textContent = config.label;

	const input = document.createElement( 'input' );
	input.name = 'editor';
	input.type = 'radio';
	input.value = index;

	label.appendChild( input );

	form.appendChild( label );
} );

form.addEventListener( 'change', evt => {
	const index = evt.target && parseInt( evt.target.value, 10 );

	if ( typeof index == 'number' ) {
		initEditor( options[ index ] );
	}
} );
