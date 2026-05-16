# Documentation Complète - K-EMPIRE WORDPRESS SETUP

## Table des matières

1. [Plugin Principal](#1-plugin-principal)
2. [Champs Meta Box](#2-champs-meta-box)
3. [Configuration JSON pour Import](#3-configuration-json-pour-import)
4. [Structure API REST](#4-structure-api-rest)
5. [Fonctions de Transformation React](#5-fonctions-de-transformation-react)

---

# 1. PLUGIN PRINCIPAL

**Fichier** : `wp-content/plugins/kempire-cpt/kempire-cpt.php`

```php
<?php
/**
 * Plugin Name: K-Empire CPT
 * Description: Custom Post Types for K-Empire Corporation
 * Version: 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Enregistrement des Custom Post Types et Taxonomies
 */
function kempire_register_post_types() {
    // ============================================
    // CPT: FORMATIONS
    // ============================================
    register_post_type( 'formations', array(
        'labels'       => array(
            'name'               => __( 'Formations', 'kempire' ),
            'singular_name'      => __( 'Formation', 'kempire' ),
            'add_new'            => __( 'Ajouter', 'kempire' ),
            'add_new_item'       => __( 'Ajouter une formation', 'kempire' ),
            'edit_item'          => __( 'Modifier la formation', 'kempire' ),
            'new_item'           => __( 'Nouvelle formation', 'kempire' ),
            'view_item'          => __( 'Voir la formation', 'kempire' ),
            'search_items'       => __( 'Rechercher une formation', 'kempire' ),
            'not_found'          => __( 'Aucune formation trouvée', 'kempire' ),
            'not_found_in_trash' => __( 'Aucune formation dans la corbeille', 'kempire' ),
        ),
        'public'              => true,
        'has_archive'         => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,           // ACTIVER L'API REST
        'rest_base'           => 'formations',   // BASE URL: /wp-json/wp/v2/formations
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt', 'author', 'custom-fields' ),
        'menu_icon'           => 'dashicons-welcome-learn-more',
        'rewrite'             => array( 'slug' => 'formations' ),
    ) );

    // ============================================
    // TAXONOMIE: CATÉGORIE FORMATION
    // ============================================
    register_taxonomy( 'categorie_formation', 'formations', array(
        'labels'       => array(
            'name'              => __( 'Catégories de formations', 'kempire' ),
            'singular_name'     => __( 'Catégorie de formation', 'kempire' ),
            'search_items'      => __( 'Rechercher une catégorie', 'kempire' ),
            'all_items'         => __( 'Toutes les catégories', 'kempire' ),
            'edit_item'         => __( 'Modifier la catégorie', 'kempire' ),
            'update_item'       => __( 'Mettre à jour la catégorie', 'kempire' ),
            'add_new_item'      => __( 'Ajouter une catégorie', 'kempire' ),
            'new_item_name'     => __( 'Nouvelle catégorie', 'kempire' ),
            'menu_name'         => __( 'Catégories', 'kempire' ),
        ),
        'hierarchical'      => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'show_in_rest'      => true,
        'rest_base'         => 'categorie_formation',
        'rewrite'          => array( 'slug' => 'categorie-formation' ),
    ) );

    // ============================================
    // CPT: ÉVÉNEMENTS
    // ============================================
    register_post_type( 'evenements', array(
        'labels'       => array(
            'name'               => __( 'Événements', 'kempire' ),
            'singular_name'      => __( 'Événement', 'kempire' ),
            'add_new'            => __( 'Ajouter', 'kempire' ),
            'add_new_item'       => __( 'Ajouter un événement', 'kempire' ),
            'edit_item'          => __( 'Modifier l\'événement', 'kempire' ),
            'new_item'           => __( 'Nouvel événement', 'kempire' ),
            'view_item'          => __( 'Voir l\'événement', 'kempire' ),
            'search_items'       => __( 'Rechercher un événement', 'kempire' ),
            'not_found'          => __( 'Aucun événement trouvé', 'kempire' ),
            'not_found_in_trash' => __( 'Aucun événement dans la corbeille', 'kempire' ),
        ),
        'public'              => true,
        'has_archive'         => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,            // ACTIVER L'API REST
        'rest_base'           => 'evenements',    // BASE URL: /wp-json/wp/v2/evenements
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt', 'author', 'custom-fields' ),
        'menu_icon'           => 'dashicons-calendar-alt',
        'rewrite'             => array( 'slug' => 'evenements' ),
    ) );

    // ============================================
    // TAXONOMIE: CATÉGORIE ÉVÉNEMENT
    // ============================================
    register_taxonomy( 'categorie_evenement', 'evenements', array(
        'labels'       => array(
            'name'              => __( 'Catégories d\'événements', 'kempire' ),
            'singular_name'     => __( 'Catégorie d\'événement', 'kempire' ),
            'search_items'      => __( 'Rechercher une catégorie', 'kempire' ),
            'all_items'         => __( 'Toutes les catégories', 'kempire' ),
            'edit_item'         => __( 'Modifier la catégorie', 'kempire' ),
            'update_item'       => __( 'Mettre à jour la catégorie', 'kempire' ),
            'add_new_item'      => __( 'Ajouter une catégorie', 'kempire' ),
            'new_item_name'     => __( 'Nouvelle catégorie', 'kempire' ),
            'menu_name'         => __( 'Catégories', 'kempire' ),
        ),
        'hierarchical'      => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'show_in_rest'      => true,
        'rest_base'         => 'categorie_evenement',
        'rewrite'          => array( 'slug' => 'categorie-evenement' ),
    ) );
}
add_action( 'init', 'kempire_register_post_types' );

// Flush rewrite rules à l'activation
function kempire_flush_rewrite_rules() {
    kempire_register_post_types();
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'kempire_flush_rewrite_rules' );
register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );

// Charger les champs Meta Box
require_once dirname( __FILE__ ) . '/inc/meta-box-fields.php';
```

---

# 2. CHAMPS META BOX

**Fichier** : `wp-content/plugins/kempire-cpt/inc/meta-box-fields.php`

**IMPORTANT** : Pour les répéteurs sans extension premium Meta Box Groups, on utilise `clone: true` sur chaque champ individuel. Les champs sont recombinés par index côté PHP/REST.

```php
<?php
/**
 * Meta Box Fields for K-Empire Corporation
 * Version: 1.1.0
 * 
 * Répéteurs: Utilisent clone: true sur champs individuels (pas type: 'group')
 * Les champs clonés sont recombinés par index dans les helpers REST
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// ============================================
// CHAMPS META BOX : FORMATIONS
// ============================================

add_filter( 'rwmb_meta_boxes', 'kempire_formation_fields' );

function kempire_formation_fields( $meta_boxes ) {
    $prefix = 'kempire_';

    // ============================================
    // GROUPE 1: INFORMATIONS DE LA FORMATION
    // ============================================
    $meta_boxes[] = array(
        'title'      => __( 'Informations de la formation', 'kempire' ),
        'id'         => 'kempire-formation-info',
        'post_types' => array( 'formations' ),
        'context'    => 'normal',
        'priority'   => 'high',
        'fields'     => array(
            array(
                'name'        => __( 'Accroche / Sous-titre', 'kempire' ),
                'id'          => $prefix . 'hook',
                'type'        => 'textarea',
                'placeholder' => 'Maîtrisez les principes juridiques essentiels...',
                'rows'        => 3,
                'show_in_rest' => true,
            ),
            array(
                'name'        => __( 'Durée', 'kempire' ),
                'id'          => $prefix . 'duration',
                'type'        => 'text',
                'placeholder' => '3 jours',
                'show_in_rest' => true,
            ),
            array(
                'name'    => __( 'Format', 'kempire' ),
                'id'      => $prefix . 'format',
                'type'    => 'select',
                'options' => array(
                    'presentiel'          => __( 'Présentiel', 'kempire' ),
                    'en_ligne'            => __( 'En ligne', 'kempire' ),
                    'presentiel_en_ligne' => __( 'Présentiel / En ligne', 'kempire' ),
                ),
                'show_in_rest' => true,
            ),
            array(
                'name'        => __( 'Lieu', 'kempire' ),
                'id'          => $prefix . 'location',
                'type'        => 'text',
                'placeholder' => 'Lomé, Togo',
                'show_in_rest' => true,
            ),
            array(
                'name'        => __( 'Public cible', 'kempire' ),
                'id'          => $prefix . 'audience',
                'type'        => 'textarea',
                'placeholder' => 'Juristes, responsables juridiques...',
                'rows'        => 2,
                'show_in_rest' => true,
            ),
            array(
                'name'    => __( 'Niveau', 'kempire' ),
                'id'      => $prefix . 'level',
                'type'    => 'select',
                'options' => array(
                    'debutant'      => __( 'Débutant', 'kempire' ),
                    'intermediaire' => __( 'Intermédiaire', 'kempire' ),
                    'avance'        => __( 'Avancé', 'kempire' ),
                    'tous_niveaux'  => __( 'Tous niveaux', 'kempire' ),
                ),
                'show_in_rest' => true,
            ),
            array(
                'name'        => __( 'Prix', 'kempire' ),
                'id'          => $prefix . 'price',
                'type'        => 'text',
                'placeholder' => '450 000 FCFA',
                'show_in_rest' => true,
            ),
            array(
                'name'        => __( 'Prochaine session', 'kempire' ),
                'id'          => $prefix . 'next_session',
                'type'        => 'text',
                'placeholder' => '15 Avril 2026',
                'show_in_rest' => true,
            ),
            array(
                'name' => __( 'Formation mise en avant', 'kempire' ),
                'desc' => __( 'Cocher pour afficher dans le banner', 'kempire' ),
                'id'   => $prefix . 'featured',
                'type' => 'checkbox',
                'std'  => 0,
                'show_in_rest' => true,
            ),
        ),
    );

    // ============================================
    // GROUPE 2: PROGRAMME (RÉPÉTEUR)
    // Deux champs clonés liés par index
    // ============================================
    $meta_boxes[] = array(
        'title'      => __( 'Programme de la formation', 'kempire' ),
        'id'         => 'kempire-formation-program',
        'post_types' => array( 'formations' ),
        'context'    => 'normal',
        'priority'   => 'high',
        'fields'     => array(
            array(
                'name'        => __( 'Titre du module', 'kempire' ),
                'id'          => $prefix . 'module_title',
                'type'        => 'text',
                'clone'       => true,
                'sort_clone'  => true,
                'add_button'  => __( '+ Ajouter un module', 'kempire' ),
                'placeholder' => 'Module 1 : Cadre juridique OHADA',
                'show_in_rest' => true,
            ),
            array(
                'name'        => __( 'Contenu du module', 'kempire' ),
                'id'          => $prefix . 'module_content',
                'type'        => 'textarea',
                'clone'       => true,
                'sort_clone'  => true,
                'rows'        => 4,
                'placeholder' => 'Présentation du traité OHADA...',
                'show_in_rest' => true,
            ),
        ),
    );

    // ============================================
    // GROUPE 3: OBJECTIFS (RÉPÉTEUR)
    // Clone sur champ individuel
    // ============================================
    $meta_boxes[] = array(
        'title'      => __( 'Objectifs de la formation', 'kempire' ),
        'id'         => 'kempire-formation-objectives',
        'post_types' => array( 'formations' ),
        'context'    => 'normal',
        'priority'   => 'high',
        'fields'     => array(
            array(
                'name'        => __( 'Objectif', 'kempire' ),
                'id'          => $prefix . 'objective',
                'type'        => 'text',
                'clone'       => true,
                'sort_clone'  => true,
                'add_button'  => __( '+ Ajouter un objectif', 'kempire' ),
                'placeholder' => 'Maîtriser les fondamentaux du droit des contrats OHADA',
                'show_in_rest' => true,
            ),
        ),
    );

    // ============================================
    // GROUPE 4: PRÉREQUIS
    // ============================================
    $meta_boxes[] = array(
        'title'      => __( 'Prérequis', 'kempire' ),
        'id'         => 'kempire-formation-prerequisites',
        'post_types' => array( 'formations' ),
        'context'    => 'normal',
        'priority'   => 'high',
        'fields'     => array(
            array(
                'name'        => __( 'Prérequis', 'kempire' ),
                'id'          => $prefix . 'prerequisites',
                'type'        => 'textarea',
                'placeholder' => 'Aucun prérequis particulier...',
                'rows'        => 4,
                'show_in_rest' => true,
            ),
        ),
    );

    // ============================================
    // GROUPE 5: MODALITÉS PRATIQUES
    // ============================================
    $meta_boxes[] = array(
        'title'      => __( 'Modalités pratiques', 'kempire' ),
        'id'         => 'kempire-formation-practical',
        'post_types' => array( 'formations' ),
        'context'    => 'normal',
        'priority'   => 'high',
        'fields'     => array(
            array(
                'name'        => __( 'Durée détaillée', 'kempire' ),
                'id'          => $prefix . 'practical_duration',
                'type'        => 'text',
                'placeholder' => '3 jours (24 heures)',
                'show_in_rest' => true,
            ),
            array(
                'name'        => __( 'Horaires', 'kempire' ),
                'id'          => $prefix . 'practical_schedule',
                'type'        => 'text',
                'placeholder' => '09:00 - 17:00',
                'show_in_rest' => true,
            ),
            array(
                'name'        => __( 'Supports', 'kempire' ),
                'id'          => $prefix . 'practical_materials',
                'type'        => 'textarea',
                'placeholder' => 'Support de formation, cas pratiques...',
                'rows'        => 2,
                'show_in_rest' => true,
            ),
            array(
                'name'        => __( 'Évaluation', 'kempire' ),
                'id'          => $prefix . 'practical_evaluation',
                'type'        => 'text',
                'placeholder' => 'Quiz final + attestation',
                'show_in_rest' => true,
            ),
        ),
    );

    // ============================================
    // GROUPE 6: FORMATEURS (RÉPÉTEUR)
    // 4 champs clonés liés par index
    // ============================================
    $meta_boxes[] = array(
        'title'      => __( 'Formateurs', 'kempire' ),
        'id'         => 'kempire-formation-trainers',
        'post_types' => array( 'formations' ),
        'context'    => 'normal',
        'priority'   => 'high',
        'fields'     => array(
            array(
                'name'        => __( 'Nom du formateur', 'kempire' ),
                'id'          => $prefix . 'trainer_name',
                'type'        => 'text',
                'clone'       => true,
                'sort_clone'  => true,
                'add_button'  => __( '+ Ajouter un formateur', 'kempire' ),
                'placeholder' => 'Dr. Kodjo Amegah',
                'show_in_rest' => true,
            ),
            array(
                'name'        => __( 'Fonction / Rôle', 'kempire' ),
                'id'          => $prefix . 'trainer_role',
                'type'        => 'text',
                'clone'       => true,
                'sort_clone'  => true,
                'placeholder' => 'Expert en droit OHADA',
                'show_in_rest' => true,
            ),
            array(
                'name'        => __( 'Biographie', 'kempire' ),
                'id'          => $prefix . 'trainer_bio',
                'type'        => 'textarea',
                'clone'       => true,
                'sort_clone'  => true,
                'rows'        => 3,
                'placeholder' => 'Dr. Kodjo Amegah est un expert reconnu...',
                'show_in_rest' => true,
            ),
            array(
                'name'            => __( 'Photo du formateur', 'kempire' ),
                'id'              => $prefix . 'trainer_image',
                'type'            => 'image',
                'clone'           => true,
                'max_file_uploads' => 1,
                'image_size'      => 'thumbnail',
                'show_in_rest'    => true,
            ),
        ),
    );

    return $meta_boxes;
}

// ============================================
// CHAMPS META BOX : ÉVÉNEMENTS
// ============================================

add_filter( 'rwmb_meta_boxes', 'kempire_event_fields' );

function kempire_event_fields( $meta_boxes ) {
    $prefix = 'kempire_';

    $meta_boxes[] = array(
        'title'      => __( 'Informations de l\'événement', 'kempire' ),
        'id'         => 'kempire-event-info',
        'post_types' => array( 'evenements' ),
        'context'    => 'normal',
        'priority'   => 'high',
        'fields'     => array(
            // Type d'événement
            array(
                'name'    => __( 'Type d\'événement', 'kempire' ),
                'id'      => $prefix . 'event_type',
                'type'    => 'select',
                'options' => array(
                    'seminaire'   => __( 'Séminaire', 'kempire' ),
                    'webinaire'  => __( 'Webinaire', 'kempire' ),
                    'atelier'    => __( 'Atelier', 'kempire' ),
                    'conference' => __( 'Conférence', 'kempire' ),
                ),
                'show_in_rest' => true,
                'rest_value'  => 'event_type',
            ),
            // Date
            array(
                'name'        => __( 'Date', 'kempire' ),
                'id'          => $prefix . 'event_date',
                'type'        => 'text',
                'placeholder' => '25 Avril 2026',
                'show_in_rest' => true,
                'rest_value'  => 'event_date',
            ),
            // Horaire
            array(
                'name'        => __( 'Horaire', 'kempire' ),
                'id'          => $prefix . 'event_time',
                'type'        => 'text',
                'placeholder' => '09:00 - 17:00',
                'show_in_rest' => true,
                'rest_value'  => 'event_time',
            ),
            // Lieu
            array(
                'name'        => __( 'Lieu', 'kempire' ),
                'id'          => $prefix . 'event_location',
                'type'        => 'text',
                'placeholder' => 'Hôtel Sarakawa, Lomé',
                'show_in_rest' => true,
                'rest_value'  => 'event_location',
            ),
            // Nombre de places
            array(
                'name' => __( 'Nombre de places', 'kempire' ),
                'id'   => $prefix . 'event_spots',
                'type' => 'number',
                'min'  => 0,
                'step' => 1,
                'show_in_rest' => true,
                'rest_value'  => 'event_spots',
            ),
            // Places réservées
            array(
                'name' => __( 'Places réservées', 'kempire' ),
                'id'   => $prefix . 'event_registered',
                'type' => 'number',
                'min'  => 0,
                'step' => 1,
                'show_in_rest' => true,
                'rest_value'  => 'event_registered',
            ),
            // Format
            array(
                'name'    => __( 'Format', 'kempire' ),
                'id'      => $prefix . 'event_format',
                'type'    => 'select',
                'options' => array(
                    'presentiel'      => __( 'Présentiel', 'kempire' ),
                    'visioconference' => __( 'Visioconférence', 'kempire' ),
                ),
                'show_in_rest' => true,
                'rest_value'  => 'event_format',
            ),
            // Durée
            array(
                'name'        => __( 'Durée', 'kempire' ),
                'id'          => $prefix . 'event_duration',
                'type'        => 'text',
                'placeholder' => '1 jour',
                'show_in_rest' => true,
                'rest_value'  => 'event_duration',
            ),
        ),
    );

    return $meta_boxes;
}

// ============================================
// CHAMPS META BOX : ARTICLES
// ============================================

add_filter( 'rwmb_meta_boxes', 'kempire_post_fields' );

function kempire_post_fields( $meta_boxes ) {
    $prefix = 'kempire_';

    $meta_boxes[] = array(
        'title'      => __( 'Informations de l\'auteur', 'kempire' ),
        'id'         => 'kempire-post-author',
        'post_types' => array( 'post' ),
        'context'    => 'normal',
        'priority'   => 'high',
        'fields'     => array(
            // Fonction de l'auteur
            array(
                'name'        => __( 'Fonction de l\'auteur', 'kempire' ),
                'id'          => $prefix . 'author_role',
                'type'        => 'text',
                'placeholder' => 'Expert en gouvernance d\'entreprise',
                'show_in_rest' => true,
                'rest_value'  => 'author_role',
            ),
            // Photo de l'auteur
            array(
                'name'             => __( 'Photo de l\'auteur', 'kempire' ),
                'id'               => $prefix . 'author_image',
                'type'             => 'image',
                'image_size'       => 'thumbnail',
                'max_file_uploads' => 1,
                'show_in_rest'     => true,
                'rest_value'       => 'author_image',
            ),
            // Temps de lecture
            array(
                'name'        => __( 'Temps de lecture', 'kempire' ),
                'id'          => $prefix . 'read_time',
                'type'        => 'text',
                'placeholder' => '8 min',
                'show_in_rest' => true,
                'rest_value'  => 'read_time',
            ),
        ),
    );

    return $meta_boxes;
}

// ============================================
// CONFIGURATION API REST
// ============================================

add_action( 'rest_api_init', 'kempire_add_acf_compatibility_fields' );

function kempire_add_acf_compatibility_fields() {
    // ============================================
    // CHAMPS REST POUR FORMATIONS
    // ============================================
    register_rest_field( 'formations', 'acf', array(
        'get_callback' => function( $post ) {
            $prefix = 'kempire_';
            return array(
                // Champs simples
                'hook'                 => get_post_meta( $post['id'], $prefix . 'hook', true ),
                'duration'             => get_post_meta( $post['id'], $prefix . 'duration', true ),
                'format'               => get_post_meta( $post['id'], $prefix . 'format', true ),
                'location'             => get_post_meta( $post['id'], $prefix . 'location', true ),
                'audience'             => get_post_meta( $post['id'], $prefix . 'audience', true ),
                'level'                => get_post_meta( $post['id'], $prefix . 'level', true ),
                'price'                => get_post_meta( $post['id'], $prefix . 'price', true ),
                'next_session'         => get_post_meta( $post['id'], $prefix . 'next_session', true ),
                'featured'             => (bool) get_post_meta( $post['id'], $prefix . 'featured', true ),
                'prerequisites'        => get_post_meta( $post['id'], $prefix . 'prerequisites', true ),
                'practical_duration'    => get_post_meta( $post['id'], $prefix . 'practical_duration', true ),
                'practical_schedule'   => get_post_meta( $post['id'], $prefix . 'practical_schedule', true ),
                'practical_materials'  => get_post_meta( $post['id'], $prefix . 'practical_materials', true ),
                'practical_evaluation' => get_post_meta( $post['id'], $prefix . 'practical_evaluation', true ),
                // Champs répéteurs
                'objectives'           => kempire_get_objectives( $post['id'] ),
                'program'              => kempire_get_program( $post['id'] ),
                'trainers'             => kempire_get_trainers( $post['id'] ),
            );
        },
        'update_callback' => null,
        'schema' => null,
    ) );

    // ============================================
    // CHAMPS REST POUR ÉVÉNEMENTS
    // ============================================
    register_rest_field( 'evenements', 'acf', array(
        'get_callback' => function( $post ) {
            $prefix = 'kempire_';
            return array(
                'event_type'      => get_post_meta( $post['id'], $prefix . 'event_type', true ),
                'event_date'      => get_post_meta( $post['id'], $prefix . 'event_date', true ),
                'event_time'      => get_post_meta( $post['id'], $prefix . 'event_time', true ),
                'event_location'  => get_post_meta( $post['id'], $prefix . 'event_location', true ),
                'event_spots'     => get_post_meta( $post['id'], $prefix . 'event_spots', true ),
                'event_registered' => get_post_meta( $post['id'], $prefix . 'event_registered', true ),
                'event_format'    => get_post_meta( $post['id'], $prefix . 'event_format', true ),
                'event_duration'  => get_post_meta( $post['id'], $prefix . 'event_duration', true ),
            );
        },
        'update_callback' => null,
        'schema' => null,
    ) );

    // ============================================
    // CHAMPS REST POUR ARTICLES
    // ============================================
    register_rest_field( 'post', 'acf', array(
        'get_callback' => function( $post ) {
            $prefix = 'kempire_';
            $author_image = get_post_meta( $post['id'], $prefix . 'author_image', true );
            return array(
                'author_role'  => get_post_meta( $post['id'], $prefix . 'author_role', true ),
                'author_image' => is_numeric( $author_image ) 
                    ? wp_get_attachment_image_url( $author_image, 'thumbnail' ) 
                    : $author_image,
                'read_time'    => get_post_meta( $post['id'], $prefix . 'read_time', true ),
            );
        },
        'update_callback' => null,
        'schema' => null,
    ) );
}

// ============================================
// HELPERS: Récupération des répéteurs
// ============================================

/**
 * IMPORTANT: Avec clone: true sur champs individuels,
 * les valeurs sont stockées comme plusieurs entrées meta.
 * On doit les recombiner par index.
 */

/**
 * Récupère les objectifs - champs clonés individuels
 */
function kempire_get_objectives( $post_id ) {
    $values = get_post_meta( $post_id, 'kempire_objective', false );
    if ( ! is_array( $values ) || empty( $values ) ) {
        return array();
    }
    return array_values( array_filter( array_map( 'strval', $values ) ) );
}

/**
 * Récupère le programme - recombinaison par index des champs clonés
 */
function kempire_get_program( $post_id ) {
    $titles   = get_post_meta( $post_id, 'kempire_module_title', false );
    $contents = get_post_meta( $post_id, 'kempire_module_content', false );
    
    if ( ! is_array( $titles ) || empty( $titles ) ) {
        return array();
    }
    
    $result = array();
    foreach ( $titles as $i => $title ) {
        if ( ! empty( $title ) ) {
            $result[] = array(
                'module_title'   => strval( $title ),
                'module_content' => isset( $contents[ $i ] ) ? strval( $contents[ $i ] ) : '',
            );
        }
    }
    return $result;
}

/**
 * Récupère les formateurs - recombinaison par index des 4 champs clonés
 */
function kempire_get_trainers( $post_id ) {
    $names  = get_post_meta( $post_id, 'kempire_trainer_name', false );
    $roles  = get_post_meta( $post_id, 'kempire_trainer_role', false );
    $bios   = get_post_meta( $post_id, 'kempire_trainer_bio', false );
    $images = get_post_meta( $post_id, 'kempire_trainer_image', false );
    
    if ( ! is_array( $names ) || empty( $names ) ) {
        return array();
    }
    
    $result = array();
    foreach ( $names as $i => $name ) {
        if ( ! empty( $name ) ) {
            $img_id = isset( $images[ $i ] ) && is_numeric( $images[ $i ] ) ? absint( $images[ $i ] ) : 0;
            $image_url = $img_id ? wp_get_attachment_image_url( $img_id, 'thumbnail' ) : '';
            
            $result[] = array(
                'trainer_name'  => strval( $name ),
                'trainer_role'  => isset( $roles[ $i ] ) ? strval( $roles[ $i ] ) : '',
                'trainer_bio'   => isset( $bios[ $i ] ) ? strval( $bios[ $i ] ) : '',
                'trainer_image' => $image_url,
            );
        }
    }
    return $result;
}
```

---

# 3. CONFIGURATION JSON POUR IMPORT

**Fichier** : `wordpress-meta-box-config.json`

```json
{
  "meta_boxes": [
    {
      "id": "kempire-formation-info",
      "title": "Informations de la formation",
      "post_type": "formations",
      "fields": [
        { "id": "kempire_hook", "name": "Accroche / Sous-titre", "type": "textarea", "api_key": "hook" },
        { "id": "kempire_duration", "name": "Durée", "type": "text", "api_key": "duration" },
        { "id": "kempire_format", "name": "Format", "type": "select", "options": { "presentiel": "Présentiel", "en_ligne": "En ligne", "presentiel_en_ligne": "Présentiel / En ligne" }, "api_key": "format" },
        { "id": "kempire_location", "name": "Lieu", "type": "text", "api_key": "location" },
        { "id": "kempire_audience", "name": "Public cible", "type": "textarea", "api_key": "audience" },
        { "id": "kempire_level", "name": "Niveau", "type": "select", "options": { "debutant": "Débutant", "intermediaire": "Intermédiaire", "avance": "Avancé", "tous_niveaux": "Tous niveaux" }, "api_key": "level" },
        { "id": "kempire_price", "name": "Prix", "type": "text", "api_key": "price" },
        { "id": "kempire_next_session", "name": "Prochaine session", "type": "text", "api_key": "next_session" },
        { "id": "kempire_featured", "name": "Formation mise en avant", "type": "checkbox", "api_key": "featured" }
      ]
    },
    {
      "id": "kempire-formation-program",
      "title": "Programme de la formation",
      "post_type": "formations",
      "fields": [
        {
          "id": "kempire_program",
          "name": "Programme",
          "type": "repeater",
          "sub_fields": [
            { "id": "module_title", "name": "Titre du module", "type": "text" },
            { "id": "module_content", "name": "Contenu du module", "type": "textarea" }
          ],
          "api_key": "program"
        }
      ]
    },
    {
      "id": "kempire-formation-objectives",
      "title": "Objectifs de la formation",
      "post_type": "formations",
      "fields": [
        {
          "id": "kempire_objectives",
          "name": "Objectifs",
          "type": "repeater",
          "sub_fields": [
            { "id": "objective", "name": "Objectif", "type": "text" }
          ],
          "api_key": "objectives"
        }
      ]
    },
    {
      "id": "kempire-formation-prerequisites",
      "title": "Prérequis",
      "post_type": "formations",
      "fields": [
        { "id": "kempire_prerequisites", "name": "Prérequis", "type": "textarea", "api_key": "prerequisites" }
      ]
    },
    {
      "id": "kempire-formation-practical",
      "title": "Modalités pratiques",
      "post_type": "formations",
      "fields": [
        { "id": "kempire_practical_duration", "name": "Durée détaillée", "type": "text", "api_key": "practical_duration" },
        { "id": "kempire_practical_schedule", "name": "Horaires", "type": "text", "api_key": "practical_schedule" },
        { "id": "kempire_practical_materials", "name": "Supports", "type": "textarea", "api_key": "practical_materials" },
        { "id": "kempire_practical_evaluation", "name": "Évaluation", "type": "text", "api_key": "practical_evaluation" }
      ]
    },
    {
      "id": "kempire-formation-trainers",
      "title": "Formateurs",
      "post_type": "formations",
      "fields": [
        {
          "id": "kempire_trainers",
          "name": "Formateurs",
          "type": "repeater",
          "sub_fields": [
            { "id": "trainer_name", "name": "Nom du formateur", "type": "text" },
            { "id": "trainer_role", "name": "Fonction / Rôle", "type": "text" },
            { "id": "trainer_bio", "name": "Biographie", "type": "textarea" },
            { "id": "trainer_image", "name": "Photo du formateur", "type": "image" }
          ],
          "api_key": "trainers"
        }
      ]
    },
    {
      "id": "kempire-event-info",
      "title": "Informations de l'événement",
      "post_type": "evenements",
      "fields": [
        { "id": "kempire_event_type", "name": "Type d'événement", "type": "select", "options": { "seminaire": "Séminaire", "webinaire": "Webinaire", "atelier": "Atelier", "conference": "Conférence" }, "api_key": "event_type" },
        { "id": "kempire_event_date", "name": "Date", "type": "text", "api_key": "event_date" },
        { "id": "kempire_event_time", "name": "Horaire", "type": "text", "api_key": "event_time" },
        { "id": "kempire_event_location", "name": "Lieu", "type": "text", "api_key": "event_location" },
        { "id": "kempire_event_spots", "name": "Nombre de places", "type": "number", "api_key": "event_spots" },
        { "id": "kempire_event_registered", "name": "Places réservées", "type": "number", "api_key": "event_registered" },
        { "id": "kempire_event_format", "name": "Format", "type": "select", "options": { "presentiel": "Présentiel", "visioconference": "Visioconférence" }, "api_key": "event_format" },
        { "id": "kempire_event_duration", "name": "Durée", "type": "text", "api_key": "event_duration" }
      ]
    },
    {
      "id": "kempire-post-author",
      "title": "Informations de l'auteur",
      "post_type": "post",
      "fields": [
        { "id": "kempire_author_role", "name": "Fonction de l'auteur", "type": "text", "api_key": "author_role" },
        { "id": "kempire_author_image", "name": "Photo de l'auteur", "type": "image", "api_key": "author_image" },
        { "id": "kempire_read_time", "name": "Temps de lecture", "type": "text", "api_key": "read_time" }
      ]
    }
  ],
  "custom_post_types": [
    { "post_type": "formations", "slug": "formations", "singular": "Formation", "plural": "Formations", "taxonomies": ["categorie_formation"] },
    { "post_type": "evenements", "slug": "evenements", "singular": "Événement", "plural": "Événements", "taxonomies": ["categorie_evenement"] }
  ],
  "custom_taxonomies": [
    { "taxonomy": "categorie_formation", "object_type": "formations", "singular": "Catégorie de formation", "plural": "Catégories de formations", "hierarchical": true },
    { "taxonomy": "categorie_evenement", "object_type": "evenements", "singular": "Catégorie d'événement", "plural": "Catégories d'événements", "hierarchical": true }
  ]
}
```

---

# 4. STRUCTURE API REST

## Endpoints

| Contenu | Endpoint REST |
|---------|--------------|
| Formations | `/wp-json/wp/v2/formations` |
| Événements | `/wp-json/wp/v2/evenements` |
| Articles | `/wp-json/wp/v2/posts` |
| Catégories Formations | `/wp-json/wp/v2/categorie_formation` |
| Catégories Événements | `/wp-json/wp/v2/categorie_evenement` |

## Réponse API: FORMATION

```json
{
  "id": 10,
  "date": "2026-04-08T13:34:43",
  "slug": "formation-ohada",
  "status": "publish",
  "type": "formations",
  "title": { "rendered": "Sécurisation des contrats d'affaires" },
  "content": { "rendered": "" },
  "excerpt": { "rendered": "" },
  "featured_media": 0,
  "author": 1,
  
  "acf": {
    "hook": "Maîtrisez les principes juridiques essentiels",
    "duration": "3 jours",
    "format": "presentiel",
    "location": "Lomé, Togo",
    "audience": "Juristes, responsables juridiques",
    "level": "intermediaire",
    "price": "450 000 FCFA",
    "next_session": "15 Avril 2026",
    "featured": true,
    "prerequisites": "Aucun prérequis particulier...",
    "practical_duration": "3 jours (24 heures)",
    "practical_schedule": "09:00 - 17:00",
    "practical_materials": "Support de formation, cas pratiques",
    "practical_evaluation": "Quiz final + attestation",
    
"objectives": [
      "Maîtriser les fondamentaux du droit des contrats OHADA",
      "Sécuriser vos opérations commerciales"
    ],
    
    "program": [
      {
        "module_title": "Module 1 : Cadre juridique OHADA",
        "module_content": "Présentation du traité OHADA et des Actes uniformes."
      },
      {
        "module_title": "Module 2 : Sécurisation des contrats",
        "module_content": "Les clauses essentielles pour sécuriser vos contrats."
      }
    ],
    
    "trainers": [
      {
        "trainer_name": "Dr. Kodjo Amegah",
        "trainer_role": "Expert en droit OHADA",
        "trainer_bio": "Dr. Kodjo Amegah est un expert reconnu en droit des affaires OHADA...",
        "trainer_image": "https://example.com/uploads/avatar.jpg"
      }
    ]
  },
  
  "categorie_formation": [1, 2],
  
  "_links": { ... }
}
```

## Réponse API: ÉVÉNEMENT

```json
{
  "id": 15,
  "type": "evenements",
  "title": { "rendered": "Gouvernance d'entreprise" },
  "content": { "rendered": "<p>Contenu...</p>" },
  "excerpt": { "rendered": "<p>Résumé...</p>" },
  "featured_media": 42,
  
  "acf": {
    "event_type": "seminaire",
    "event_date": "25 Avril 2026",
    "event_time": "09:00 - 17:00",
    "event_location": "Hôtel Sarakawa, Lomé",
    "event_spots": 30,
    "event_registered": 18,
    "event_format": "presentiel",
    "event_duration": "1 jour"
  },
  
  "categorie_evenement": [3]
}
```

## Réponse API: ARTICLE

```json
{
  "id": 20,
  "type": "post",
  "title": { "rendered": "L'importance de la gouvernance" },
  "content": { "rendered": "<p>Contenu...</p>" },
  "excerpt": { "rendered": "<p>Résumé...</p>" },
  "date": "2026-03-15T10:00:00",
  "author": 1,
  "featured_media": 55,
  "categories": [3],
  "tags": [8, 12],
  
  "acf": {
    "author_role": "Expert en gouvernance d'entreprise",
    "author_image": "https://example.com/uploads/author.jpg",
    "read_time": "8 min"
  }
}
```

---

# 5. FONCTIONS DE TRANSFORMATION REACT

**Fichier recommandé** : `src/utils/api.js` ou `src/api/transformers.js`

```javascript
// ============================================
// CONFIGURATION
// ============================================

const API_URL = 'https://votre-site.com/wp-json/wp/v2';

// Labels de traduction pour les select
const FORMAT_LABELS = {
  'presentiel': 'Présentiel',
  'en_ligne': 'En ligne',
  'presentiel_en_ligne': 'Présentiel / En ligne'
};

const LEVEL_LABELS = {
  'debutant': 'Débutant',
  'intermediaire': 'Intermédiaire',
  'avance': 'Avancé',
  'tous_niveaux': 'Tous niveaux'
};

const EVENT_TYPE_LABELS = {
  'seminaire': 'Séminaire',
  'webinaire': 'Webinaire',
  'atelier': 'Atelier',
  'conference': 'Conférence'
};

const EVENT_FORMAT_LABELS = {
  'presentiel': 'Présentiel',
  'visioconference': 'Visioconférence'
};

// ============================================
// TRANSFORMATION: FORMATION
// ============================================

/**
 * Transforme la réponse API WordPress en modèle Formation
 * @param {Object} wp - Réponse brute de l'API WordPress
 * @returns {Object} Formation formatée pour le frontend
 */
export function transformFormation(wp) {
  const acf = wp.acf || {};

  return {
    id: wp.id,
    title: wp.title?.rendered?.replace(/<[^>]*>/g, '') || '',
    slug: wp.slug,
    date: wp.date,
    
    // Champs simples
    hook: acf.hook || '',
    duration: acf.duration || '',
    format: FORMAT_LABELS[acf.format] || acf.format || '',
    location: acf.location || '',
    audience: acf.audience || '',
    level: LEVEL_LABELS[acf.level] || acf.level || '',
    price: acf.price || '',
    nextSession: acf.next_session || '',
    
    // Image mise en avant (à résoudre avec /wp/v2/media/{id})
    image: wp.featured_media || null,
    
    // Répéteur: Objectifs
    objectives: Array.isArray(acf.objectives) ? acf.objectives : [],
    
    // Prérequis
    prerequisites: acf.prerequisites || '',
    
    // Répéteur: Programme
    program: Array.isArray(acf.program) 
      ? acf.program.map(p => ({
          title: p.module_title || '',
          content: p.module_content || ''
        }))
      : [],
    
    // Modalités pratiques
    practical: {
      duration: acf.practical_duration || '',
      schedule: acf.practical_schedule || '',
      materials: acf.practical_materials || '',
      evaluation: acf.practical_evaluation || ''
    },
    
    // Répéteur: Formateurs
    trainers: Array.isArray(acf.trainers)
      ? acf.trainers.map(t => ({
          name: t.trainer_name || '',
          role: t.trainer_role || '',
          bio: t.trainer_bio || '',
          image: t.trainer_image || ''
        }))
      : [],
    
    // Mise en avant
    featured: acf.featured === true || acf.featured === '1',
    
    // Type fixe
    type: 'Formation',
    
    // Taxonomie
    categories: wp.categorie_formation || []
  };
}

// ============================================
// TRANSFORMATION: ÉVÉNEMENT
// ============================================

/**
 * Transforme la réponse API WordPress en modèle Événement
 * @param {Object} wp - Réponse brute de l'API WordPress
 * @returns {Object} Événement formaté pour le frontend
 */
export function transformEvenement(wp) {
  const acf = wp.acf || {};

  return {
    id: wp.id,
    title: wp.title?.rendered?.replace(/<[^>]*>/g, '') || '',
    slug: wp.slug,
    date: wp.date,
    
    // Contenu HTML
    excerpt: wp.excerpt?.rendered || '',
    content: wp.content?.rendered || '',
    
    // Champs personnalisés
    type: EVENT_TYPE_LABELS[acf.event_type] || acf.event_type || 'Événement',
    date: acf.event_date || '',
    time: acf.event_time || '',
    location: acf.event_location || '',
    spots: parseInt(acf.event_spots) || 0,
    registered: parseInt(acf.event_registered) || 0,
    format: EVENT_FORMAT_LABELS[acf.event_format] || acf.event_format || '',
    duration: acf.event_duration || '',
    
    // Image mise en avant
    image: wp.featured_media || null,
    
    // Taxonomie
    categories: wp.categorie_evenement || []
  };
}

// ============================================
// TRANSFORMATION: ARTICLE
// ============================================

/**
 * Transforme la réponse API WordPress en modèle Article
 * @param {Object} wp - Réponse brute de l'API WordPress
 * @param {Object} authorData - Données de l'auteur (optionnel)
 * @returns {Object} Article formaté pour le frontend
 */
export function transformPost(wp, authorData = null) {
  const acf = wp.acf || {};

  return {
    id: wp.id,
    title: wp.title?.rendered?.replace(/<[^>]*>/g, '') || '',
    slug: wp.slug,
    date: wp.date,
    
    // Contenu HTML
    excerpt: wp.excerpt?.rendered || '',
    content: wp.content?.rendered || '',
    
    // Auteur
    author: authorData?.name || wp.author_name || 'Auteur',
    authorRole: acf.author_role || '',
    authorImage: acf.author_image || authorData?.avatar_urls?.['96'] || '',
    
    // Temps de lecture
    readTime: acf.read_time || '',
    
    // Image mise en avant
    image: wp.featured_media || null,
    
    // Taxonomies natives
    categories: wp.categories || [],
    tags: wp.tags || [],
    
    // Flag pour distinguer des événements
    isEvent: false
  };
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Récupère l'URL de l'image à partir de l'ID
 * @param {number} mediaId - ID de l'image
 * @returns {Promise<string|null>}
 */
export async function getMediaUrl(mediaId) {
  if (!mediaId) return null;
  try {
    const res = await fetch(`${API_URL}/media/${mediaId}`);
    const data = await res.json();
    return data.source_url || null;
  } catch (error) {
    console.error('Erreur récupération image:', error);
    return null;
  }
}

/**
 * Récupère une formation par slug
 * @param {string} slug - Slug de la formation
 * @returns {Promise<Object|null>}
 */
export async function getFormationBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/formations?slug=${slug}&_embed`);
    const data = await res.json();
    if (data.length > 0) {
      return transformFormation(data[0]);
    }
    return null;
  } catch (error) {
    console.error('Erreur récupération formation:', error);
    return null;
  }
}

/**
 * Récupère toutes les formations
 * @returns {Promise<Array>}
 */
export async function getAllFormations() {
  try {
    const res = await fetch(`${API_URL}/formations?per_page=100&_embed`);
    const data = await res.json();
    return data.map(transformFormation);
  } catch (error) {
    console.error('Erreur récupération formations:', error);
    return [];
  }
}

/**
 * Récupère un événement par slug
 * @param {string} slug - Slug de l'événement
 * @returns {Promise<Object|null>}
 */
export async function getEvenementBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/evenements?slug=${slug}&_embed`);
    const data = await res.json();
    if (data.length > 0) {
      return transformEvenement(data[0]);
    }
    return null;
  } catch (error) {
    console.error('Erreur récupération événement:', error);
    return null;
  }
}

/**
 * Récupère tous les événements
 * @returns {Promise<Array>}
 */
export async function getAllEvenements() {
  try {
    const res = await fetch(`${API_URL}/evenements?per_page=100&_embed`);
    const data = await res.json();
    return data.map(transformEvenement);
  } catch (error) {
    console.error('Erreur récupération événements:', error);
    return [];
  }
}

/**
 * Récupère la formation mise en avant (featured = true)
 * @returns {Promise<Object|null>}
 */
export async function getFeaturedFormation() {
  try {
    const res = await fetch(`${API_URL}/formations?meta_key=kempire_featured&meta_value=1`);
    const data = await res.json();
    if (data.length > 0) {
      return transformFormation(data[0]);
    }
    return null;
  } catch (error) {
    console.error('Erreur récupération formation mise en avant:', error);
    return null;
  }
}
```

---

# 6. INSTALLATION SUR UN NOUVEAU SERVEUR

## Étapes d'installation

### 1. Installer les extensions WordPress
- **Meta Box** : https://wordpress.org/plugins/meta-box/
- **Meta Box Builder** (optionnel, pour interface graphique)

### 2. Créer le plugin K-Empire CPT

Créer le fichier `wp-content/plugins/kempire-cpt/kempire-cpt.php` avec le contenu de la section 1.

Créer le dossier `wp-content/plugins/kempire-cpt/inc/` et y placer `meta-box-fields.php` (section 2).

### 3. Activer le plugin
```bash
wp plugin activate kempire-cpt
```

### 4. Régénérer les permaliens
Aller dans **Réglages → Permaliens** et cliquer sur "Enregistrer" (ou via WP-CLI) :
```bash
wp rewrite flush
```

### 5. Vérifier l'API
```bash
curl http://localhost:8881/wp-json/wp/v2/formations
```

---

# 7. RÉSUMÉ DES FICHIERS

| Fichier | Description |
|---------|-------------|
| `wp-content/plugins/kempire-cpt/kempire-cpt.php` | Plugin principal (CPT + Taxonomies) |
| `wp-content/plugins/kempire-cpt/inc/meta-box-fields.php` | Champs Meta Box + REST API |
| `wordpress-meta-box-config.json` | Export JSON pour documentation |
| `wordpress-api-documentation.md` | Documentation complète |

---

# 8. COMMANDES WP-CLI UTILES

```bash
# Lister les CPT
wp post type list

# Créer une formation
wp post create --post_type=formations --post_title="Ma Formation" --post_status=publish

# Ajouter un champ méta
wp post meta update [ID] kempire_duration "3 jours"

# Lister les formations
wp post list --post_type=formations

# Supprimer une formation
wp post delete [ID]

# Régénérer les permaliens
wp rewrite flush

# Voir les permaliens actuels
wp rewrite list
```

---

*Document généré le 2026-04-08 - Version 1.0.0*
