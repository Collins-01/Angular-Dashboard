import { Component, signal, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * KnowledgebaseEditorComponent provides a markdown editor with live preview
 * Features:
 * - Split-view layout (editor left, preview right)
 * - Live markdown rendering
 * - Save to localStorage
 * - Responsive (stacked on mobile)
 */
@Component({
    selector: 'app-knowledgebase-editor',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './knowledgebase-editor.component.html',
    styleUrl: './knowledgebase-editor.component.css'
})
export class KnowledgebaseEditorComponent {
    // Markdown content
    markdownContent = signal<string>('');

    // Preview HTML
    previewHtml = signal<SafeHtml>('');

    // Save status
    saveStatus = signal<string>('');

    constructor(
        private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        // Load content only in browser
        if (isPlatformBrowser(this.platformId)) {
            this.markdownContent.set(this.loadContent());
        } else {
            // Default content for SSR
            this.markdownContent.set('# Loading...');
        }

        // Initialize preview
        this.updatePreview();
    }

    /**
     * Update markdown content and preview
     */
    onContentChange(content: string): void {
        this.markdownContent.set(content);
        this.updatePreview();
    }

    /**
     * Update the preview HTML from markdown
     * Using simple markdown-like rendering without external library
     */
    private updatePreview(): void {
        const markdown = this.markdownContent();
        let html = markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            // Code blocks
            .replace(/```(.*?)```/gs, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code>$1</code></pre>')
            // Inline code
            .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">$1</code>')
            // Links
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>')
            // Lists
            .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
            .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
            // Line breaks
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');

        // Wrap lists
        html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc my-2">$1</ul>');

        this.previewHtml.set(this.sanitizer.sanitize(1, html) || '');
    }

    /**
     * Save content to localStorage
     */
    saveContent(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('knowledgebase-content', this.markdownContent());
            this.saveStatus.set('Saved successfully!');

            // Clear status after 3 seconds
            setTimeout(() => {
                this.saveStatus.set('');
            }, 3000);
        }
    }

    /**
     * Load content from localStorage
     */
    private loadContent(): string {
        if (!isPlatformBrowser(this.platformId)) {
            return '';
        }

        const saved = localStorage.getItem('knowledgebase-content');
        return saved || `# Welcome to the Knowledgebase Editor

## Getting Started

This is a **markdown editor** with live preview. Start typing to see your content rendered in real-time.

### Features

* Live preview
* Markdown support
* Local storage persistence
* Split-view layout

### Markdown Syntax

**Bold text**: \`**bold**\`
*Italic text*: \`*italic*\`
\`Inline code\`: \`\`code\`\`

\`\`\`
Code blocks
are supported too
\`\`\`

[Links](https://example.com) work as well!

---

Start editing to create your knowledgebase articles.`;
    }
}
