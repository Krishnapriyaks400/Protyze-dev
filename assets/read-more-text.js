if (!customElements.get('read-more-text')) {
  customElements.define(
    'read-more-text',
    class ReadMoreText extends HTMLElement {
      connectedCallback() {
        this.textEl = this.querySelector('.product__description-text');
        this.button = this.querySelector('[data-readmore-toggle]');
        this.showLabel = this.querySelector('[data-readmore-show]');
        this.hideLabel = this.querySelector('[data-readmore-hide]');
        if (!this.textEl || !this.button) return;

        // The server-rendered markup ships the full, untruncated description
        // (so it's visible with JS disabled and to search engine crawlers).
        // Only now, once JS is confirmed running, do we apply the clamp.
        this.textEl.classList.add('product__description-text--truncated');

        // If clamping didn't actually clip anything, there's nothing to expand.
        if (this.textEl.scrollHeight <= this.textEl.clientHeight + 1) {
          this.textEl.classList.remove('product__description-text--truncated');
          return;
        }

        this.button.hidden = false;
        this.button.addEventListener('click', this.onToggle.bind(this));
      }

      onToggle() {
        const isTruncated = this.textEl.classList.toggle('product__description-text--truncated');
        this.showLabel.hidden = !isTruncated;
        this.hideLabel.hidden = isTruncated;
      }
    }
  );
}
