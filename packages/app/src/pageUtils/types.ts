import { Metadata } from 'next';

export type Page<Params, SearchParams> = ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => Promise<React.ReactElement>;

export type GenerateMetadata<Params, SearchParams> = ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) => Promise<Metadata>;
