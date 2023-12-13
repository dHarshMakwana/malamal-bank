#!/bin/bash

PROJECT_NAME=$1
PROJECT_NAME_LOWERCASE=$(echo "${PROJECT_NAME//-/}" | awk '{print tolower($0)}')

FOLDERS=("_components" "_types" "_styles")

ROOT_DIRECTORY="src/app"

mkdir $ROOT_DIRECTORY/$PROJECT_NAME_LOWERCASE

cd $ROOT_DIRECTORY/$PROJECT_NAME

for FOLDER in ${FOLDERS[@]}
do
    mkdir $FOLDER
    if [ $FOLDER == "_styles" ]; then
        touch "$FOLDER/$PROJECT_NAME.module.scss"
    elif [ $FOLDER == "_components" ]; then
        echo "import React from 'react';
        import '../_styles/$PROJECT_NAME.module.scss';

        const $PROJECT_NAME: React.FC = () => {
          return <div>{'$PROJECT_NAME Component'}</div>;
        };

        export default ${PROJECT_NAME};" > "$FOLDER/$PROJECT_NAME.tsx"
    fi
done

echo "import React from \"react\"; 
import dynamic from \"next/dynamic\";

const $PROJECT_NAME = dynamic(() => import(\"./_components/$PROJECT_NAME\"), { ssr: false });

const $PROJECT_NAME_LOWERCASE = () => {
  return <$PROJECT_NAME />;
};

export default $PROJECT_NAME_LOWERCASE;" > page.tsx

# to use this file do this: ./create_project.sh project_name 