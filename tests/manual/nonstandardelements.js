/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals console:false, document, window, CKEditorInspector */

import InlineEditor from '../../src/inlineeditor';
import ArticlePluginSet from '@ckeditor/ckeditor5-core/tests/_utils/articlepluginset';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Undo from '@ckeditor/ckeditor5-undo/src/undo';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import { createObserver } from '@ckeditor/ckeditor5-utils/tests/_utils/utils';

window.editors = {};
window.editables = [];
window._observers = [];

function initEditors() {
	InlineEditor
		.create( document.querySelector( '#editor-1' ), {
			plugins: [ Essentials, Font, Bold, Italic, Underline, Code, Link, Undo, Highlight ],
			useInlineRoot: true,
			toolbar: [
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
				'undo',
				'redo'
			]
		} )
		.then( editor => {
			console.log( '#editor-1 has been initialized', editor );
			console.log( 'It has been added to global `editors` and `editables`.' );

			CKEditorInspector.attach( '#editor-1', editor );

			window.editors[ '#editor-1' ] = editor;
			window.editables.push( editor.editing.view.document.getRoot() );

			const observer = createObserver();

			observer.observe(
				'#editor-1.ui.focusTracker',
				editor.ui.focusTracker,
				[ 'isFocused' ]
			);

			window._observers.push( observer );
		} )
		.catch( err => {
			console.error( err.stack );
		} );

	InlineEditor
		.create( document.querySelector( '#editor-2' ), {
			plugins: [ ArticlePluginSet, Font, Highlight, Underline, Code ],
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
			console.log( '#editor-2 has been initialized', editor );
			console.log( 'It has been added to global `editors` and `editables`.' );

			CKEditorInspector.attach( '#editor-2', editor );

			window.editors[ '#editor-2' ] = editor;
			window.editables.push( editor.editing.view.document.getRoot() );

			const observer = createObserver();

			observer.observe(
				'#editor-2.ui.focusTracker',
				editor.ui.focusTracker,
				[ 'isFocused' ]
			);

			window._observers.push( observer );
		} )
		.catch( err => {
			console.error( err.stack );
		} );
}

function destroyEditors() {
	for ( const selector in window.editors ) {
		window.editors[ selector ].destroy().then( () => {
			console.log( `${ selector } was destroyed.` );
		} );
	}

	for ( const observer of window._observers ) {
		observer.stopListening();
	}

	window.editors = {};
	window.editables.length = window._observers.length = 0;
}

document.getElementById( 'initEditors' ).addEventListener( 'click', initEditors );
document.getElementById( 'destroyEditors' ).addEventListener( 'click', destroyEditors );
