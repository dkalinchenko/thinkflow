/**
 * Inline Editing Module
 * Allows users to edit criteria and alternative names/weights directly
 */

import { StateManager } from './state.js';
import { showToast } from './utils.js';

// Store active editor
let activeEditor = null;

/**
 * Enable inline editing for criteria and alternatives
 */
export function initInlineEditing() {
    console.log('✅ Inline editing initialized');
}

/**
 * Make an element inline-editable
 */
export function makeEditable(element, config) {
    if (!element) return;

    const { type, id, field, value, onSave, validate } = config;

    element.classList.add('inline-editable');
    element.setAttribute('data-editable', 'true');
    element.setAttribute('data-field', field);
    element.setAttribute('title', 'Click to edit');

    element.addEventListener('click', (e) => {
        e.stopPropagation();
        startEdit(element, { type, id, field, value, onSave, validate });
    });
}

/**
 * Start inline editing
 */
function startEdit(element, config) {
    // Don't allow multiple editors
    if (activeEditor) {
        cancelEdit();
    }

    const { type, id, field, value, onSave, validate } = config;
    const originalContent = element.textContent;

    // Create input element
    const input = document.createElement(field === 'description' ? 'textarea' : 'input');
    input.type = field === 'weight' ? 'number' : 'text';
    input.className = 'inline-editor';
    input.value = value || originalContent;

    if (field === 'weight') {
        input.step = '0.1';
        input.min = '0.1';
        input.max = '5.0';
    }

    // Style the input
    input.style.width = '100%';
    input.style.font = window.getComputedStyle(element).font;
    input.style.padding = '4px 8px';
    input.style.border = '2px solid var(--accent-primary)';
    input.style.borderRadius = '4px';
    input.style.outline = 'none';

    // Replace element content with input
    element.textContent = '';
    element.appendChild(input);
    element.classList.add('editing');

    // Focus and select
    input.focus();
    input.select();

    activeEditor = {
        element,
        input,
        originalContent,
        config
    };

    // Handle save
    const saveEdit = async () => {
        const newValue = input.value.trim();

        // Validate
        if (validate && !validate(newValue)) {
            input.style.borderColor = 'var(--error-color)';
            input.focus();
            return;
        }

        // No change
        if (newValue === originalContent) {
            cancelEdit();
            return;
        }

        try {
            // Call save callback
            if (onSave) {
                await onSave(newValue);
            }

            // Update state based on type
            if (type === 'criterion') {
                await window.app.updateCriterion(id, field, newValue);
            } else if (type === 'alternative') {
                await window.app.updateAlternative(id, field, newValue);
            }

            // Restore element with new value
            element.textContent = newValue;
            element.classList.remove('editing');
            activeEditor = null;

            showToast(`${field.charAt(0).toUpperCase() + field.slice(1)} updated`, 'success');
        } catch (error) {
            console.error('Error saving inline edit:', error);
            showToast('Failed to save changes', 'error');
            input.style.borderColor = 'var(--error-color)';
            input.focus();
        }
    };

    // Event listeners
    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    });
}

/**
 * Cancel current edit
 */
function cancelEdit() {
    if (!activeEditor) return;

    const { element, originalContent } = activeEditor;
    element.textContent = originalContent;
    element.classList.remove('editing');
    activeEditor = null;
}

/**
 * Validate criterion/alternative name
 */
export function validateName(value) {
    if (!value || value.length === 0) {
        showToast('Name cannot be empty', 'error');
        return false;
    }
    if (value.length > 100) {
        showToast('Name must be less than 100 characters', 'error');
        return false;
    }
    return true;
}

/**
 * Validate weight
 */
export function validateWeight(value) {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0.1 || num > 5.0) {
        showToast('Weight must be between 0.1 and 5.0', 'error');
        return false;
    }
    return true;
}

export default {
    initInlineEditing,
    makeEditable,
    validateName,
    validateWeight
};
