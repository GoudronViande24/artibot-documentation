import { ArtibotDocumentationConfig, Page } from "./interfaces.js";

/**
 * Config builder for the documentation module
 * @since 3.0.0
 */
export class ArtibotDocumentationConfigBuilder implements ArtibotDocumentationConfig {
	name: string = "Documentation";
	commandName: string = "documentation";
	commandDescription: string = "Get help about the bot";
	argName: string = "page";
	argDescription: string = "The page you want to see";
	pages: Page[] = [];

	/**
	 * Set the name of the documentation
	 * @param name Name of the documentation
	 */
	public setName(name: string): this {
		this.name = name;
		return this;
	}

	/**
	 * Set the name of the command
	 * @param commandName Name of the command
	 */
	public setCommandName(commandName: string): this {
		this.commandName = commandName;
		return this;
	}

	/**
	 * Set the description of the command
	 * @param commandDescription Description of the command
	 */
	public setCommandDescription(commandDescription: string): this {
		this.commandDescription = commandDescription;
		return this;
	}

	/**
	 * Set the name of the argument
	 * @param argName Name of the argument
	 */
	public setArgName(argName: string): this {
		this.argName = argName;
		return this;
	}

	/**
	 * Set the description of the argument
	 * @param argDescription Description of the argument
	 */
	public setArgDescription(argDescription: string): this {
		this.argDescription = argDescription;
		return this;
	}

	/**
	 * Add a page to the documentation
	 * @param callback Callback to configure the page
	 */
	public addPage(callback: (page: PageBuilder) => Page): this {
		const page = new PageBuilder();
		this.pages.push(callback(page));
		return this;
	}
}

/**
 * Page config builder for the documentation module
 * @since 3.0.0
 */
export class PageBuilder implements Page {
	name: string = "Page";
	content: string = "Content";
	icon?: string;
	image?: string;
	author?: string;

	/**
	 * Set the name of the page
	 * @param name Name of the page
	 */
	public setName(name: string): this {
		this.name = name;
		return this;
	}

	/**
	 * Set the content of the page
	 * @param content Content of the page
	 */
	public setContent(content: string): this {
		this.content = content;
		return this;
	}

	/**
	 * Set the icon of the page
	 * @param icon Icon of the page
	 */
	public setIcon(icon: string): this {
		this.icon = icon;
		return this;
	}

	/**
	 * Set the image of the page
	 * @param image Image of the page
	 */
	public setImage(image: string): this {
		this.image = image;
		return this;
	}

	/**
	 * Set the author of the page
	 * @param author Author of the page
	 */
	public setAuthor(author: string): this {
		this.author = author;
		return this;
	}
}