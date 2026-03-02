'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const methodArray = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;

const formSchema = z.object({
  endpoint: z.url({ message: 'please enter a valid URL' }),
  method: z.enum(methodArray),
  body: z.string().optional(),
  variableName: z
    .string()
    .min(1, { message: 'Variable name is required' })
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, {
      message:
        'Variable name must start with a letter, underscore and can only contain letters, numbers, and underscores',
    }),
  // .refine(),JSON5
});

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: HttpRequestFormValues) => void;
  defaultValues?: Partial<HttpRequestFormValues>;
}

export type HttpRequestFormValues = z.infer<typeof formSchema>;

export const HttpRequestsDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const form = useForm<HttpRequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endpoint: defaultValues.endpoint || '',
      method: defaultValues.method || 'GET',
      body: defaultValues.body || '',
      variableName: defaultValues.variableName || '',
    },
  });

  const watchVariableName = form.watch('variableName') || 'myApiCall';
  const watchMethod = form.watch('method');
  const showBodyField = ['POST', 'PUT', 'PATCH'].includes(watchMethod);

  useEffect(() => {
    if (open) {
      form.reset({
        endpoint: defaultValues.endpoint || '',
        method: defaultValues.method || 'GET',
        body: defaultValues.body || '',
        variableName: defaultValues.variableName || '',
      });
    }
  }, [open, defaultValues, form]);

  const handleSubmit = (values: HttpRequestFormValues) => {
    onSubmit(values);
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>HTTP Requests</DialogTitle>
          <DialogDescription>
            Configure settings for the HTTP request node
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-8 mt-4'
          >
            <FormField
              control={form.control}
              name='variableName'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Variable Name</FormLabel>
                    <FormControl>
                      <Input placeholder='myApiCall' {...field} />
                    </FormControl>
                    <FormDescription>
                      Use this name to reference the response of this HTTP
                      request in other nodes:{' '}
                      {`{{${watchVariableName}.httpResponse.data}}`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='method'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='select a method' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {methodArray.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The HTTP method to use for this request
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name='endpoint'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Endpoint URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='https://api.example.com/{{httpResponse.data.id}}'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Static URL or use {'{{variables}}'} for simple values or{' '}
                      {'{{json variable}}'} to stringify objects
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {showBodyField && (
              <FormField
                control={form.control}
                name='body'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Request body</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            '{\n "userId": "{{httpResponse.data.id}}",\n "name": "{{httpResponse.data.name}}",\n "items": "{{httpResponse.data.items}}"\n}'
                          }
                          className='min-h-[120px] font-mono text-sm'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        JSON request body. Use {'{{variables}}'} for simple
                        values or {'{{json variable}}'} to stringify objects
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}
            <DialogFooter className='mt-4'>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
