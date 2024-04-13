openLightBox(element, lightboxId) {
    // Récupérer la galerie spécifique à partir de l'élément cliqué
    let gallery = element.closest('.gallery');
  
    // Créer une lightbox pour cette galerie
    this.createLightBox(gallery, lightboxId, true);
  
    // Mettre à jour le contenu de la lightbox avec l'image cliquée
    $(`#${lightboxId}`)
      .find(".lightboxImage")
      .attr("src", element.attr("src"));
  
    // Afficher la lightbox
    $(`#${lightboxId}`).modal("show");
  },
  
  prevImage() {
    let activeImage = $(".lightboxImage").attr("src");
    let imagesCollection = $(".gallery-item");
  
    let index = imagesCollection.index(imagesCollection.filter(`[src="${activeImage}"]`));
    let prevIndex = (index - 1 + imagesCollection.length) % imagesCollection.length;
    let prevImageSrc = imagesCollection.eq(prevIndex).attr("src");
  
    $(".lightboxImage").attr("src", prevImageSrc);
  },
  
  nextImage() {
    let activeImage = $(".lightboxImage").attr("src");
    let imagesCollection = $(".gallery-item");
  
    let index = imagesCollection.index(imagesCollection.filter(`[src="${activeImage}"]`));
    let nextIndex = (index + 1) % imagesCollection.length;
    let nextImageSrc = imagesCollection.eq(nextIndex).attr("src");
  
    $(".lightboxImage").attr("src", nextImageSrc);
  },
  
  
  createLightBox(gallery, lightboxId, navigation) {
    // Supprimer toute lightbox existante
    $(`#${lightboxId}`).remove();
  
    // Ajouter une lightbox à la galerie spécifique
    gallery.append(`<div class="modal fade" id="${lightboxId}" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-body">
                      ${
                        navigation
                          ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;">&lt;</div>'
                          : '<span style="display:none;" />'
                      }
                      <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                      ${
                        navigation
                          ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;">&gt;</div>'
                          : '<span style="display:none;" />'
                      }
                  </div>
              </div>
          </div>
      </div>`);
  
    // Récupérer la lightbox créée
    let lightbox = $(`#${lightboxId}`);
  
    // Ajouter les gestionnaires d'événements clic pour les boutons "Précédent" et "Suivant"
    lightbox.find('.mg-prev').on('click', () => this.prevImage(lightboxId));
    lightbox.find('.mg-next').on('click', () => this.nextImage(lightboxId));
  },