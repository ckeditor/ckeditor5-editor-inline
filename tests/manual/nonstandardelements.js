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
import { createObserver } from '@ckeditor/ckeditor5-utils/tests/_utils/utils';

window.editors = {};
window.editables = [];
window._observers = [];

function initEditors() {
	init( '#editor-1', true );
	init( '#editor-2' );

	function init( selector, useInlineRoot = false ) {
		InlineEditor
			.create( document.querySelector( selector ), {
				plugins: [ ArticlePluginSet, Font, Highlight, Underline, Code ],
				useInlineRoot,
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
				console.log( `${ selector }. has been initialized`, editor );
				console.log( 'It has been added to global `editors` and `editables`.' );

				CKEditorInspector.attach( selector, editor );

				window.editors[ selector ] = editor;
				window.editables.push( editor.editing.view.document.getRoot() );

				const observer = createObserver();

				observer.observe(
					`${ selector }.ui.focusTracker`,
					editor.ui.focusTracker,
					[ 'isFocused' ]
				);

				window._observers.push( observer );
			} )
			.catch( err => {
				console.error( err.stack );
			} );
	}
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
