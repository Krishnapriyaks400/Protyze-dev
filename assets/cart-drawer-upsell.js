if (!window.cartUpsellAddInitialized) {
  window.cartUpsellAddInitialized = true;

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('.cart-drawer-upsell__add');

    if (!button || button.disabled) return;

    const variantId = button.dataset.variantId;
    if (!variantId) return;

    const originalHTML = button.innerHTML;

    button.disabled = true;
    button.innerHTML = 'Adding...';

    try {
      const cartDrawer = document.querySelector('cart-drawer');

      // Request refreshed drawer sections along with the add-to-cart action.
      const sections = cartDrawer?.getSectionsToRender?.() || [];
      const sectionIds = sections.map((section) => section.id);

      const response = await fetch(
        `${window.Shopify.routes.root}cart/add.js`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            items: [
              {
                id: Number(variantId),
                quantity: 1
              }
            ],
            sections: sectionIds,
            sections_url: window.location.pathname
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.description || result.message || 'Unable to add product.'
        );
      }

      // Refresh the drawer using Dawn's native rendering method.
      if (
        cartDrawer &&
        typeof cartDrawer.renderContents === 'function'
      ) {
        cartDrawer.renderContents(result);
        cartDrawer.open();
      } else {
        // Fallback: reload the page if Dawn's drawer API is unavailable.
        window.location.reload();
        return;
      }

      button.innerHTML = 'Added ✓';

      setTimeout(() => {
        if (button.isConnected) {
          button.innerHTML = originalHTML;
          button.disabled = false;
        }
      }, 1500);

    } catch (error) {
      console.error('Upsell add-to-cart error:', error);

      button.innerHTML = 'Try again';
      button.disabled = false;

      setTimeout(() => {
        if (button.isConnected) {
          button.innerHTML = originalHTML;
        }
      }, 2000);
    }
  });
}