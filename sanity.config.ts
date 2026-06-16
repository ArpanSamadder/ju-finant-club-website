import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  apiVersion,
  title: 'JU FinAnt Club CMS',
  schema: {
    types: schemaTypes
  },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })]
});
