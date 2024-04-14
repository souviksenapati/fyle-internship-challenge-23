# Github Repositories Listing Page

## Challenge Outline
Built with Angular 14+, this is a single-page application (SPA) that takes a GitHub username as input and displays the public Github repositories belonging to the user. For example, "Johnpabe" is a valid Github username.

## References & Requirements
- [API Documentation](https://docs.github.com/en/rest/reference)
- Fork this repository before making any changes. Once done, push your changes to the forked branch.

## Features
- Search bar to search by a GitHub username.
- Zero state display if user is not found.
- Dropdown to select the page size for pagination.
- Server-side pagination (no loading of all repositories at once).
- Default page size: 10 repositories per page.
- Option to choose up to 100 repositories per page.
- Skeleton loader displayed during API calls.

## Usage
1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the application: `ng serve`
4. Open your browser and navigate to `http://localhost:4200`

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with your enhancements.

## License
This project is licensed under the [MIT License](LICENSE).

Made with ❤️ by Souvik
