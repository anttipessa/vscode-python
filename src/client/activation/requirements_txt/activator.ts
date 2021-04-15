import { injectable } from 'inversify';
import { Hover, languages, TextDocument, Position } from 'vscode';
import { IExtensionSingleActivationService } from '../types';

@injectable()
export class RequirementsTxtLinkActivator implements IExtensionSingleActivationService {
    // eslint-disable-next-line class-methods-use-this
    public async activate(): Promise<void> {
        languages.registerHoverProvider(
            { pattern: '**/requirements.txt' },
            {
                provideHover(document: TextDocument, position: Position) {
                    const regex = '^(.*)==';

                    const row = document.lineAt(position.line).text;
                    const projectName = row.match(regex);

                    if (projectName) {
                        return new Hover(`https://pypi.org/project/${projectName[1]}/`);
                    }
                    return null;
                },
            },
        );
    }
}
