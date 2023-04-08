import { ArtibotDocumentationConfigBuilder, PageBuilder } from "./builders.js";

/**
 * Configuration for the documentation module
 * @since 3.0.0
 * @see ArtibotDocumentationConfigBuilder for a more user-friendly way to create a config
 */
export interface ArtibotDocumentationConfig {
	/** Name of the documentation */
	name: string;
	/** Name of the command */
	commandName: string;
	/** Description of the command */
	commandDescription: string;
	/** Name of the argument */
	argName: string;
	/** Description of the argument */
	argDescription: string;
	/** Pages of the documentation */
	pages: Page[];
}

/**
 * Configuration for a single page of the documentation
 * @since 3.0.0
 * @see PageBuilder for a more user-friendly way to create a page
 */
export interface Page {
	/** Name of the page */
	name: string;
	/** Content of the page */
	content: string;
	/** Icon of the page */
	icon?: string;
	/** Image of the page */
	image?: string;
	/** Author of the page */
	author?: string;
}